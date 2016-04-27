import pandas as pd

xls = pd.ExcelFile('data/c_summons_cw_2007_ytd_2015.xlsx')
df = xls.parse('Sheet1', skiprows=4, skip_footer = 19)
df = df.fillna(method='ffill')

df = df[~df.Precinct.str.contains('CITYWIDE')]
df = df[~df.Precinct.str.contains('Total')]
df = df[~df.Violation.str.contains('Total')]

df = df.drop('2015 YTD 03/31', axis=1)

df.Precinct = df.Precinct.map(lambda precinct: precinct.lstrip('0'))
df.columns = df.columns.str.replace('CY', '')

violations = pd.Series.unique(df.Violation)
violationMax = {}

for violation in violations:
    subset = df[df.Violation == violation]
    subset = subset.drop(subset.columns[[0, 1, 2]], axis = 1)
    violationMax[violation] = max(subset.max(numericOnly = True))

df['Max'] = df.apply(lambda row: violationMax[row.Violation], axis = 1)

df.to_csv('data/clean-summons-data.csv', index_label="Id")
