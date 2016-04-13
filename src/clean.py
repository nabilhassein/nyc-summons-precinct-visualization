import pandas as pd

xls = pd.ExcelFile('data/c_summons_cw_2007_ytd_2015.xlsx')
df = xls.parse('Sheet1', skiprows=4, skip_footer = 19)
df = df.fillna(method='ffill')

df = df[~df.Precinct.str.contains('CITYWIDE')]
df = df[~df.Precinct.str.contains('Total')]
df = df[~df.Violation.str.contains('Total')]

df.Precinct = df.Precinct.map(lambda precinct: precinct.lstrip('0'))
df.columns = df.columns.str.replace('CY', '')
df.columns = df.columns.str.replace(' YTD 03/31', '')

df.to_csv('data/clean-summons-data.csv', index_label="Id")
