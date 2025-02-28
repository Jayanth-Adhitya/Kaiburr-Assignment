# Consumer Complaint Text Classification Notebook

This notebook provides an end-to-end solution for classifying consumer complaints into four predefined categories:

- **0:** Credit reporting, repair, or other  
- **1:** Debt collection  
- **2:** Consumer Loan  
- **3:** Mortgage  

The notebook covers all major steps of a machine learning pipeline for text classification:

1. **Exploratory Data Analysis (EDA) & Feature Engineering:**  
   - Loads the Consumer Complaint dataset.
   - Provides an initial overview and statistical summary.
   - Maps complaint attributes (e.g., the "Product" field) to one of the four categories.

2. **Text Pre-Processing:**  
   - Cleans the complaint narratives by lowercasing, removing punctuation, eliminating stop words, and performing lemmatization.
   - Prepares the text for feature extraction.

3. **Feature Extraction & Model Building:**  
   - Converts text data into numerical features using TF-IDF vectorization.
   - Splits the dataset into training and test sets.
   - Trains multiple classification models (e.g., Logistic Regression, Random Forest, and Linear SVM).

4. **Model Performance Comparison & Evaluation:**  
   - Compares the performance of the different models using metrics like accuracy, precision, recall, and F1-score.
   - Includes visualization tools, such as confusion matrix plots, to evaluate model performance in detail.

5. **Prediction:**  
   - Demonstrates how to use the trained model to predict the category of new consumer complaints.
   - Provides a function that preprocesses new text and returns the predicted category.

This notebook is ideal for users who want to understand the full process of building a text classification model—from data cleaning and feature engineering to model training and evaluation—using a real-world dataset.
