# import dependencies
import pandas as pd
import pymongo
# YEARLY DATA -----------------------------------------------------
# read data and rename column to be deleted later
parks_data = pd.read_csv("data/np_data.csv")
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
parks = []
for i in parks_data["park_name"]:
    parks.append(i)
years = []
for i in parks_data.loc[parks_data["park_name"]=="Acadia","1904":"2019"]:
    years.append(i)
# create empty dictionary to hold all final information
np_data = {}
# add list of all parks and years as first item in final dict
np_data["parks"]=(parks)
np_data["years"]=(years)
# working variable
wip_dict = {}
# loop through each park to gather stats and visit #s
for i in parks_data["park_name"]:
    wip = parks_data.loc[parks_data["park_name"]==i,:]
    wip_list = []
    wip_list1 = []
    for j in years:
        wip_list.append(j)
        wip_list1.append(wip[j].item())
    wip_dict = {
        "park_name":i,
        "park_code":parks_data.loc[parks_data["park_name"]==i,"park_code"].item(),
        "region":parks_data.loc[parks_data["park_name"]==i,"region"].item(),
        "lat":parks_data.loc[parks_data["park_name"]==i,"lat"].item(),
        "lon":parks_data.loc[parks_data["park_name"]==i,"lon"].item(),
        "state":parks_data.loc[parks_data["park_name"]==i,"state"].item(),
        "date_established":parks_data.loc[parks_data["park_name"]==i,"date_established"].item(),
        "area_acres":parks_data.loc[parks_data["park_name"]==i,"area_acres"].item(),
        "area_km2":parks_data.loc[parks_data["park_name"]==i,"area_km2"].item(),
        "area_miles2":parks_data.loc[parks_data["park_name"]==i,"area_miles2"].item(),
        "img_url":parks_data.loc[parks_data["park_name"]==i,"img_url"].item(),
        "description":parks_data.loc[parks_data["park_name"]==i,"description"].item(),
        "visits":{wip_list[i]: wip_list1[i] for i in range(len(wip_list))}
    }
    np_data[i]=(wip_dict)



# MONTHLY DATA -----------------------------------------------------
parks_month_data = pd.read_csv("data/np_data_month.csv")
# create list of parks and months
parks = []
for i in parks_month_data["Park_Name"]:
    parks.append(i)
months = []
for i in parks_month_data.loc[parks_month_data["Park_Name"]=="Acadia","January":"December"]:
    months.append(i)
# create empty dictionary to hold all final information
np_data_month = {}
# add list of all years as first item in final dict
np_data_month["parks"]=(parks)
np_data_month["months"]=(months)
# working variable
wip_dict = {}
# loop through each park to gather stats and visit #s
for i in parks_month_data["Park_Name"]:
    wip = parks_month_data.loc[parks_month_data["Park_Name"]==i,:]
    wip_list = []
    wip_list1 = []
    for j in months:
        wip_list.append(j)
        wip_list1.append(wip[j].item())
    wip_dict = {
        "Park_Name":i,
        "Park_Region":parks_month_data.loc[parks_month_data["Park_Name"]==i,"Park_Region"].item(),
        "January":parks_month_data.loc[parks_month_data["Park_Name"]==i,"January"].item(),
        "February":parks_month_data.loc[parks_month_data["Park_Name"]==i,"February"].item(),
        "March":parks_month_data.loc[parks_month_data["Park_Name"]==i,"March"].item(),
        "April":parks_month_data.loc[parks_month_data["Park_Name"]==i,"April"].item(),
        "May":parks_month_data.loc[parks_month_data["Park_Name"]==i,"May"].item(),
        "June":parks_month_data.loc[parks_month_data["Park_Name"]==i,"June"].item(),
        "July":parks_month_data.loc[parks_month_data["Park_Name"]==i,"July"].item(),
        "August":parks_month_data.loc[parks_month_data["Park_Name"]==i,"August"].item(),
        "September":parks_month_data.loc[parks_month_data["Park_Name"]==i,"September"].item(),
        "November":parks_month_data.loc[parks_month_data["Park_Name"]==i,"November"].item(),
        "December":parks_month_data.loc[parks_month_data["Park_Name"]==i,"December"].item()
    }
    np_data_month[i]=(wip_dict)
#np_data_month is now a dict of dicts holding all of the information





#np_data is now a dict of dicts holding all of the information
#PUSH np_data dict of dicts to MongoDB
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
# define the database
db = client.national_parks_db
# define collections
# annual data & stats
park_info = db.park_info
park_info.drop()
park_info.insert_one(np_data)
# monthly data
park_months = db.park_months
park_months.drop()
park_months.insert_one(np_data_month)