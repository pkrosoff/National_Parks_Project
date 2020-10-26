# import dependencies
import pandas as pd
# read data and rename column to be deleted later
parks_data = pd.read_csv("np_data.csv")
parks_data.rename(columns={"area_km2":"AREA_km2"},inplace=True)
# splitting, reformatting area types
parks_data[['AREA_acres','area_KM2']] = parks_data.AREA_km2.str.split("(",expand=True)
area_acres = parks_data['AREA_acres'].replace({' acres':'',',':''}, regex=True)
area_acres = area_acres.str.strip().to_frame().astype('float')
parks_data['area_acres'] = area_acres
# finding km2 and mi2 with math
parks_data['area_km2'] = round(parks_data['area_acres']*0.00404686,2)
parks_data['area_miles2'] = round(parks_data['area_acres']*0.0015625,2)
parks_data = parks_data.drop(columns=['AREA_km2', 'area_KM2','AREA_acres'])
# create list of years 1904-2019
years = []
for i in parks_data.loc[parks_data["park_name"]=="Acadia","1904":]:
    years.append(i)
# create empty dictionary to hold all final information
np_data = {}
# add list of all years as first item in final dict
np_data["years"]=(years)
# working variable
wip_dict = {}
# loop through each park to gather stats and visit #s
for i in parks_data["park_name"]:
    wip = parks_data.loc[parks_data["park_name"]==i,:]
    wip_list = []
    for j in years:
        wip_list.append(wip[j].item())
    wip_dict = {
        "park_name":i,
        "park_code":parks_data.loc[parks_data["park_name"]==i,"park_code"].item(),
        "region":parks_data.loc[parks_data["park_name"]==i,"region"].item(),
        "state":parks_data.loc[parks_data["park_name"]==i,"state"].item(),
        "date_established":parks_data.loc[parks_data["park_name"]==i,"date_established"].item(),
        "area_acres":parks_data.loc[parks_data["park_name"]==i,"area_acres"].item(),
        "area_km2":parks_data.loc[parks_data["park_name"]==i,"area_km2"].item(),
        "area_miles2":parks_data.loc[parks_data["park_name"]==i,"area_miles2"].item(),
        "img_url":parks_data.loc[parks_data["park_name"]==i,"img_url"].item(),
        "description":parks_data.loc[parks_data["park_name"]==i,"description"].item(),
        "visits":wip_list
    }
    np_data[i]=(wip_dict)
#np_data is now a dict of dicts holding all of the information

#PUSH np_data dict of dicts to MongoDB