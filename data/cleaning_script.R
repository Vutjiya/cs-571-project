library(tidyverse)
library(jsonlite)

inmate_data <- read_tsv("inmate_survey.tsv")

# https://www.cbp.gov/newsroom/stats/cbp-enforcement-statistics/criminal-noncitizen-statistics
migrant_convictions <- read_tsv("migrant_convictions.tsv")

# https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/downloads%23nibrs-downloads (Summary Report System)
national_crimes <- read_csv("national_crimes.csv")

migrant_data <- migrant_convictions %>%
  rename(crime = `Conviction Type`) %>%
  mutate(
    crime = case_when(
      str_detect(crime, regex("Assault|Battery|Domestic Violence")) ~
        "violent crime",
      str_detect(
        crime,
        regex("Burglary|Robbery|Larceny|Theft|Fraud")
      ) ~
        "property crime",
      str_detect(crime, regex("Driving Under the Influence|DUI")) ~
        "traffic offenses",
      str_detect(crime, regex("Homicide|Manslaughter")) ~ "murder",
      str_detect(
        crime,
        regex("Drug|Narcotic|Possession|Trafficking")
      ) ~
        "drug offenses",
      str_detect(crime, regex("Illegal Entry|Re-Entry")) ~
        "immigration offenses",
      str_detect(crime, regex("Weapons|Firearm")) ~ "weapons offenses",
      str_detect(crime, regex("Sexual")) ~ "sexual crime",
      .default = "miscellaneous crime"
    ) %>%
      as_factor()
  ) %>%
  pivot_longer(!crime, names_to = "year", values_to = "incidents") %>%
  mutate(
    year = str_replace(year, "FY", "20") %>% as.numeric()
  ) %>%
  arrange(year) %>%
  filter(
    crime %in% c("murder", "property crime", "sexual crime", "violent crime"),
    year <= 2023
  ) %>%
  relocate(year)

crimes_data <- national_crimes %>%
  select(!c(caveats, rape_legacy)) %>%
  filter(between(year, 2017, 2024)) %>%
  rename(state = state_name, rape = rape_revised) %>%
  mutate(
    state_abbr = if_else(
      state_abbr == "NC" & state == "North Dakota",
      "ND",
      state_abbr
    )
  ) %>%
  mutate(
    state = if_else(
      year == 2023 & is.na(state_abbr) & is.na(state) & population < 11000000,
      "North Carolina",
      state
    ),
    state_abbr = if_else(
      year == 2023 & is.na(state_abbr) & population < 11000000,
      "NC",
      state_abbr
    )
  ) %>%
  filter(!is.na(state_abbr)) %>%
  mutate(
    across(where(is.numeric), \(col) replace_na(col, 0)),
  ) %>%
  group_by(year) %>%
  summarize(across(where(is.numeric), sum)) %>%
  pivot_longer(
    cols = !c(year, population),
    names_to = "crime",
    values_to = "incidents"
  ) %>%
  mutate(
    crime = case_when(
      str_detect(crime, regex("violent_crime|aggravated_assault")) ~
        "violent crime",
      str_detect(crime, regex("homicide")) ~ "murder",
      str_detect(
        crime,
        regex("property_crime|burglary|robbery|larceny|motor_vehicle_theft")
      ) ~
        "property crime",
      str_detect(crime, regex("rape")) ~ "sexual crimes",
      .default = "miscellaneous crime"
    ) %>%
      as_factor()
  ) %>%
  group_by(year, crime) %>%
  summarize(incidents = sum(incidents))

crime_comparison_data <- bind_rows(
  list(migrants = migrant_data, national = crimes_data),
  .id = "source"
)

crime_comparison_data %>%
  toJSON(pretty = TRUE) %>%
  write_json(path = "crime_comparison.json")


total_crime_1 <- national_crimes %>%
  filter(is.na(state_name) & is.na(state_abbr))

total_crime_2 <- national_crimes %>%
  filter(between(year, 2017, 2020)) %>%
  group_by(year) %>%
  summarize(across(where(is.numeric), sum))

total_crime_3 <- national_crimes %>%
  filter(state_name == "United States Total")

total_crime_data <- list(total_crime_1, total_crime_2, total_crime_3) %>%
  bind_rows() %>%
  select(!c(starts_with("state"), caveats, rape_legacy)) %>%
  mutate(across(everything(), \(col) replace_na(col, replace = 0))) %>%
  pivot_longer(
    cols = !c(year, population),
    names_to = "crime",
    values_to = "incidents"
  ) %>%
  group_by(year) %>%
  summarize(incidents = sum(incidents))

total_crime_data %>%
  toJSON(pretty = TRUE) %>%
  write_json(path = "total_crime.json")


# crime_comparison_data %>%
#   ggplot(aes(x = year, y = incidents)) +
#   geom_col(aes(fill = crime), position = "dodge") +
#   scale_y_log10() +
#   facet_wrap(~id)

# crime_comparison_data %>%
#   filter(source == "migrants") %>%
#   ggplot(aes(x = year, y = incidents, color = crime)) +
#   geom_line(aes(group = crime))

# crime_comparison_data %>%
#   filter(source == "migrants" & between(year, 2019, 2021))

# crime_comparison_data %>%
#   filter(source == "migrants") %>%
#   tail()

gdp <- read_csv("gdp_data.csv")
dpi <- read_csv("dpi_data.csv")
cpi <- read_csv("cpi_data.csv")

gdp_data <- gdp %>%
  select(-c(1:3)) %>%
  rename(
    any_of(set_names(colnames(.), gdp %>% select(-c(1:3)) %>% slice(7)))
  ) %>%
  slice(8) %>%
  select(contains("Q2")) %>%
  pivot_longer(everything(), names_to = "year", values_to = "gdp") %>%
  mutate(
    year = as.numeric(str_replace(year, "Q2$", "")),
    gdp_change = as.numeric(gdp)
  )

dpi_data <- dpi %>%
  slice(c(7, 54)) %>%
  select(-c(1:3)) %>%
  mutate(
    across(.cols = where(\(x) !is.numeric(x)), .fns = \(x) as.numeric(x))
  ) %>%
  rename(any_of(set_names(colnames(.), 1929:2024))) %>%
  slice(2) %>%
  pivot_longer(
    cols = everything(),
    names_to = "year",
    values_to = "dpi_change",
    names_transform = \(x) as.numeric(x)
  )

cpi_data <- cpi %>%
  rename(any_of(set_names(colnames(.), cpi %>% slice(11)))) %>%
  select(-c(HALF1, HALF2)) %>%
  slice(-c(1:11)) %>%
  pivot_longer(cols = !Year, names_to = "month", values_to = "cpi") %>%
  group_by(Year) %>%
  summarise(cpi = mean(as.numeric(cpi))) %>%
  mutate(cpi_change = (cpi / lag(cpi) - 1) * 100, Year = as.numeric(Year))

# gdp_data %>%
#   tail(10)

# cpi_data %>%
#   tail(10)

# dpi_data %>%
#   tail(10)

gdp_data %>%
  write_csv("cleaned_gdp.csv")

dpi_data %>%
  write_csv("cleaned_dpi.csv")

cpi_data %>%
  write_csv("cleaned_cpi.csv")
