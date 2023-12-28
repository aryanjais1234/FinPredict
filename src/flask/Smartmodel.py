
import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OneHotEncoder
import scipy.stats as stats


def predict(df):

    df = pd.DataFrame(df)

    #print("Count of order where OCD>RDD",(df.shape[0]-df[df['ORDER_CREATION_DATE']<=df['REQUESTED_DELIVERY_DATE']].shape[0]))
    #print("% of order where OCD>RDD",print("% order data removed ",((df[df['ORDER_CREATION_DATE']>df['REQUESTED_DELIVERY_DATE']].shape[0])/df.shape[0])*100))

    
    
    df['ORDER_CREATION_DATE'] = pd.to_datetime(
        df['ORDER_CREATION_DATE'], format="%Y%m%d", errors='coerce')
    

    conversion_rates = {"EUR": 1.08, "AUD": 0.65, "CAD": 0.74, "GBP": 1.24, "MYR": 0.22, "AUD": 0.65, "PLN": 0.24, "AED": 0.27, "HKD": 0.13, "CHF": 1.11,
                        "RON": 0.22, "SGD": 0.74, "CZK": 0.045, "HU1": 0.002873, "NZD": 0.61, "BHD": 2.65, "SAR": 0.27, "QAR": 0.27, "KWD": 3.25, "SEK": 0.093}
    df['ORDER_AMOUNT'] = pd.to_numeric(df['ORDER_AMOUNT'], errors='coerce')

    df.loc[df['ORDER_CURRENCY'] != 'USD', 'amount_in_usd'] = df['ORDER_AMOUNT'] * \
        df['ORDER_CURRENCY'].map(conversion_rates)
    df.loc[df['ORDER_CURRENCY'] == 'USD', 'amount_in_usd'] = df['ORDER_AMOUNT']

    df['amount_in_usd'].sort_values(ascending=False)/1000000
    # print(df['amount_in_usd'])

    # df[['CUSTOMER_NUMBER','COMPANY_CODE']].head()

    df['unique_cust_id'] = df['CUSTOMER_NUMBER'].astype(
        str)+df['COMPANY_CODE'].astype(str)
    # df['unique_cust_id'].nunique()

    # print(df['unique_cust_id'])

    # Calculate Q1, Q3 and IQR
    Q1 = df['amount_in_usd'].quantile(0.25)
    Q3 = df['amount_in_usd'].quantile(0.75)
    IQR = Q3 - Q1

    # Define bounds
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    # Replace outliers with boundary values
    df['amount_in_usd'] = np.where(df['amount_in_usd'] < lower_bound, lower_bound,
                                   np.where(df['amount_in_usd'] > upper_bound, upper_bound, df['amount_in_usd']))

    categorical = []
    continuous = []  # empty lists 'categorical and continuous' are created

    for col in df.columns:
        if df[col].dtype == 'object':
            categorical.append(col)
        else:
            continuous.append(col)

    le = LabelEncoder()

    for col in categorical:
        df[col] = df[col].astype(str)
        df[col] = le.fit_transform(df[col])

        # Average 'ORDER_AMOUNT' by 'CUSTOMER_NUMBER'

    df['AVG_ORDER_AMOUNT_PER_CUSTOMER'] = df.groupby(
        'CUSTOMER_NUMBER')['ORDER_AMOUNT'].transform('mean')

    # Total 'ORDER_AMOUNT' by 'SALES_ORG'
    df['TOTAL_ORDER_AMOUNT_PER_SALES_ORG'] = df.groupby(
        'SALES_ORG')['ORDER_AMOUNT'].transform('sum')

    # Number of orders per 'CUSTOMER_NUMBER'
    df['NUM_ORDERS_PER_CUSTOMER'] = df.groupby(
        'CUSTOMER_NUMBER')['CUSTOMER_ORDER_ID'].transform('count')

    # Number of unique 'SALES_ORG' per 'CUSTOMER_NUMBER'
    df['NUM_UNIQUE_SALES_ORG_PER_CUSTOMER'] = df.groupby(
        'CUSTOMER_NUMBER')['SALES_ORG'].transform('nunique')

    # Earliest order date per 'CUSTOMER_NUMBER'
    df['EARLIEST_ORDER_DATE_PER_CUSTOMER'] = df.groupby(
        'CUSTOMER_NUMBER')['ORDER_CREATION_DATE'].transform('min')

    # Latest order date per 'CUSTOMER_NUMBER'
    df['LATEST_ORDER_DATE_PER_CUSTOMER'] = df.groupby(
        'CUSTOMER_NUMBER')['ORDER_CREATION_DATE'].transform('max')
    #print("after Aggregating order data on daily level", model_1.shape)
    # df['ORDER_CREATION_DATE'] = df['ORDER_CREATION_DATE'].apply(
    #     lambda x: x.toordinal())

    # print(model_1)
    # # Convert the date and time columns to string
#     df['ORDER_CREATION_DATE'] = pd.to_datetime(df['ORDER_CREATION_DATE'])
#     df = df.sort_values(['unique_cust_id', 'ORDER_CREATION_DATE'])

    def difference_in_days(melt, lags, ffday, customer_id_col, create_date_col, net_amount_col):
        for i in range(ffday, lags+1):
            melt['Last-'+str(i)+'day_Sales'] = melt.groupby(
                [customer_id_col])[net_amount_col].shift(i)

        melt = melt.reset_index(drop=True)

        for i in range(ffday, lags+1):
            melt['Last-'+str(i)+'day_Diff'] = melt.groupby([customer_id_col]
                                                           )['Last-'+str(i)+'day_Sales'].diff()
        melt = melt.fillna(0)
        return melt

    lags = 7
    ffday = 1
    customer_id_col = 'unique_cust_id'
    create_date_col = 'ORDER_CREATION_DATE'
    net_amount_col = 'amount_in_usd'

    df = difference_in_days(df, lags, ffday, customer_id_col,
                            create_date_col, net_amount_col)

    model_1 = df

    features = ['CUSTOMER_ORDER_ID',
                'SALES_ORG',
                'DISTRIBUTION_CHANNEL',
                'COMPANY_CODE',
                'ORDER_CURRENCY',
                'CUSTOMER_NUMBER',
                'ORDER_CREATION_DATE',
                'Last-1day_Sales',
                'Last-2day_Sales',
                'Last-3day_Sales',
                'Last-4day_Sales',
                'Last-5day_Sales',
                'Last-6day_Sales',
                'Last-7day_Sales']

    model = pickle.load(open(r'src\flask\model.sav', 'rb'))


    
    prediction = model.predict(model_1[features])

    # Create a dictionary of "Sl_no" and prediction
    result = dict(zip(df['Sl_no'].tolist(), prediction.tolist()))

    return result