library(tidyverse)
library(jsonlite)

inmate_data <- read_tsv("inmate_survey.tsv")

# https://www.cbp.gov/newsroom/stats/cbp-enforcement-statistics/criminal-noncitizen-statistics
migrant_convictions <- read_tsv("migrant_convictions.tsv")

# https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/downloads%23nibrs-downloads (Summary Report System)
national_crimes <- read_csv("national_crimes.csv")

# inmate_data %>%
#   select(
#     where(\(col) !all(col == 999, na.rm = TRUE) && mean(is.na(col)) <= 0.5)
#   ) %>%

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

# toJSON(pretty = TRUE)

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

bind_rows(list(migrants = migrant_data, national = crimes_data), .id = "id") %>%
  toJSON(pretty = TRUE)
