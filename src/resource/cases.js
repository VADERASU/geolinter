export const case_scripts = {
    state_education:
`{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 550,
    "height": 300,
    "background": "#F3F8FB",
    "title": "The higher education rate of the states in the US",
    "data": {
        "values": "state_education",
        "format": {
            "property": "features"
        }
    },
    "mark": "geoshape",
    "projection": {
        "type": "equalEarth"
    },
    "encoding": {
        "stroke": {
            "value": "black"
        },
        "strokeWidth": {
            "value": 1
        },
        "color": {
            "field": "properties.higher_education_rate",
            "type": "quantitative",
            "scale": {
                "range": ["#edf8e9","#edfce9"],
                "type": "threshold",
                "domain": [0.2]
            },
            "legend": {
                "title": null
            }
        }         
    },
    "usermeta": {
        "embedOptions": {
            "actions": false
        }
    }
}`,
county_unemployment:
`{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 550,
    "height": 300,
    "background": "#F3F8FB",
    "data": {
        "values": "county_unemployment",
        "format": {
            "property": "features"
        }
    },
    "mark": "geoshape",
    "projection": {
        "type": "equalEarth"
    },
    "encoding": {
        "stroke": {
            "value": "black"
        },
        "color": {
            "field": "properties.rate",
            "type": "quantitative",
            "scale": {
                "range": ["#8fd744", "#35b779", "#21918d", "#31688e", "#443a83"],
                "type": "threshold",
                "domain": [0.06, 0.12, 0.18, 0.24]
            },
            "legend": {
                "title": null
            }
        }         
    },
    "usermeta": {
        "embedOptions": {
            "actions": false
        }
    }
}`,
montreal_pop_density:
`{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 550,
    "height": 300,
    "background": "#F3F8FB",
    "data": {
        "values": "montreal_pop_density",
        "format": {
            "property": "features"
        }
    },
    "mark": "geoshape",
    "encoding": {
        "stroke": {
            "value": "black"
        },
        "color": {
            "field": "properties.popDen",
            "type": "quantitative",
            "scale": {
                "range": ["#8fd744", "#35b779", "#21918d", "#31688e", "#443a83"],
                "type": "threshold",
                "domain": [
                    2590.06,
                    5152.42,
                    7714.78,
                    10277.14
                ]
            },
            "legend": {
                "title": null
            }
        }         
    },
    "usermeta": {
        "embedOptions": {
            "actions": false
        }
    }
}`,
georgia_pctBach:
`{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 550,
    "height": 300,
    "background": "#F3F8FB",
    "data": {
        "values": "georgia_pctBach",
        "format": {
            "property": "features"
        }
    },
    "mark": "geoshape",
    "encoding": {
        "stroke": {
            "value": "black"
        },
        "color": {
            "field": "properties.PctBach",
            "type": "quantitative",
            "scale": {
                "range": ["#8fd744", "#35b779", "#21918d", "#31688e", "#443a83"],
                "type": "threshold",
                "domain": [
                    12.52,
                    20.85,
                    29.17
                ]
            },
            "legend": {
                "title": null
            }
        }         
    },
    "usermeta": {
        "embedOptions": {
            "actions": false
        }
    }
}`,

};