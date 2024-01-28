# leaflet-challenge

<img src="https://github.com/aidaroman84/leaflet-challenge/assets/141189883/22d5464f-bfa0-41e7-b39e-647f3655ebbc" width="400">

## Background
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## Instructions

Part 1: Create the Earthquake Visualization

Part 2: Gather and Plot More Data (Optional) 

## **Part 1: Create the Earthquake Visualization** 
[HTML Link](https://aidroman84.github.com/leaflet-challenge/)

![image](https://github.com/aidaroman84/leaflet-challenge/blob/main/Images/EarthquakeMap.png)

1. Dataset
    - Review and select datasets from [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
    - Data updates every 5 minutes. Selected [dataset](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson) that traces all earthquakes from past 7 days 
    - Study JSON
    ![USGS Site](./Images/3-Data.png)
    ![JSON Data](./Images/4-JSON.png)

2. Import and visualize the data by doing the following:

   - Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

   - Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear    larger, and earthquakes with greater depth should appear darker in color.

   **Hint**: The depth of the earth can be found as the third coordinate for each earthquake.

   - Include popups that provide additional information about the earthquake when its associated marker is clicked.

   ![image] Popups

  - Create a legend that will provide context for your map data.

    ![legend](./Images/legend.jpg)

- Part 2: Gather and Plot More Data (Optional)
![Outdoors](./Images/outdoors.jpg)

### Leaflet Part 2: Gather and Plot More Data (Optional)

The USGS wants you to plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. So, you will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

The following image is an example screenshot of what the USGS would like you to produce:

![5-Advanced](Images/5-Advanced.png)

Perform the following tasks: 

* Plot the tectonic plates dataset on the map in addition to the earthquakes.

* Add other base maps to choose from.

* Put each dataset into separate overlays that can be turned on and off independently.

* Add layer controls to our map.

