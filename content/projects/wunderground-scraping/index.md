---
title: "WUnderground Data Scraping"
date: 2024-09-28
oneliner: "Scrape hourly weather data, visualize it in PowerBI, and build a linear regression model to predict temperature."
category: "Academic, Self-Learning"
stack: ["Python", "Selenium", "Pandas", "Scikit-learn", "PowerBI"]
repo_url: "https://github.com/kyleconciso/wunderground-scraping"
---

## Overview
This project is a Python-based Jupyter Notebook that executes a full data science workflow: collecting hourly weather data for Pasay City from Weather Underground, cleaning and preparing it for analysis, visualizing it in PowerBI, and building a machine learning model to predict temperature.

## Workflow
1.  **Data Acquisition:** The `get_data(month, day)` function uses Selenium to navigate a Chrome instance to the correct URL for each day. After a pause to allow JavaScript rendering, BeautifulSoup parses the page source (`driver.page_source`) to find the main observation table and iterates through its rows (`<tr>`) and cells (`<td>`) to extract data points into lists.
2.  **Data Cleaning:** The raw lists are converted into a Pandas DataFrame. Cleaning involves using regex to standardize formats, dropping rows with any NaN values using `.dropna()`, and removing anomalous rows where atmospheric pressure is "0".
3.  **Data Visualization (PowerBI):** The cleaned CSV is imported into PowerBI to create dashboards that reveal trends, such as the V-shaped daily humidity pattern and the consistent atmospheric pressure values.
4.  **Model Building:** A `LinearRegression` model from Scikit-learn is used. Categorical features like 'Wind' and 'Condition' are numerically encoded. The data is split into training and testing sets using `train_test_split`, and the model is trained on the training data.
5.  **Model Evaluation:** The model's performance is evaluated on the test set using Mean Squared Error (MSE), which was 0.2135, and R-squared (R2), which was 0.6177. This R2 score indicates that the model can explain about 61.8% of the variability in temperature, suggesting moderate predictive accuracy.
