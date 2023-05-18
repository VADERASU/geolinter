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

state_shipment:
`{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 550,
    "height": 300,
    "background": "#F3F8FB",
    "title": "Value of Freight Shipments by State: 2002",
    "data": {
        "values": "state_shipment",
        "format": {
            "property": "features"
        }
    },
    "mark": "geoshape",
    "projection": {
        "type": "albersUsa"
    },
    "encoding": {
        "stroke": {
            "value": "black"
        },
        "strokeWidth": {
            "value": 1
        },
        "color": {
            "field": "properties.shipment",
            "type": "quantitative",
            "scale": {
                "range": ["#ffffff","#D9E6EB","#BAC9C9","#BAC9d4","#151719"],
                "type": "threshold",
                "domain": [50, 249, 399, 600]
            },
            "legend": {
                "title": "billion $"
            }
        }         
    },
    "usermeta": {
        "embedOptions": {
            "actions": false
        }
    }
}`,

state_shipment_norm:
`{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 550,
    "height": 300,
    "background": "#F3F8FB",
    "title": "2002 U.S. Value of Freight Shipments Per Capita by State",
    "data": {
        "values": "state_shipment_norm",
        "format": {
            "property": "features"
        }
    },
    "mark": "geoshape",
    "projection": {
        "type": "albersUsa"
    },
    "encoding": {
        "stroke": {
            "value": "black"
        },
        "strokeWidth": {
            "value": 1
        },
        "color": {
            "field": "properties.shipment_per_capita",
            "type": "quantitative",
            "scale": {
                "range": ["#ffffff","#D9E6EB","#BAC9C9","#BAC9d4","#151719"],
                "type": "threshold",
                "domain": [5000, 24900, 39900, 60000]
            },
            "legend": {
                "title": "USD"
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
    "background": "#fc9272",
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
                "range": ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#de2d26","#a50f15"],
                "type": "threshold",
                "domain": [0.06, 0.08, 0.09, 0.1, 0.12]
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
                "range": ["#32B677", "#35b779", "#21918d", "#31688e", "#443a83"],
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
    "title": "Poverty Rates in Georgia",
    "background": "#F3F8FB",
    "data": {
        "values": "georgia_pctBach",
        "format": {
            "property": "features"
        }
    },
    "mark": "geoshape",
    "projection": {
        "type": "mercator"
    },
    "encoding": {
        "stroke": {
            "value": "#F3F8FB"
        },
        "color": {
            "field": "properties.PctPov",
            "type": "quantitative",
            "scale": {
                "range": ["#fcd792", "#f1bd71", "#918cc4", "#817dbb", "#70669d"],
                "type": "threshold",
                "domain": [
                    11,
                    13,
                    15,
                    17,
                    52.2
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
chicago_income:
`{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 550,
    "height": 300,
    "background": "#F3F8FB",
    "data": {
        "values": "chicago_income",
        "format": {
            "property": "features"
        }
    },
    "mark": "geoshape",
    "projection": {
        "type": "mercator"
    },
    "encoding": {
        "stroke": {
            "value": "black"
        },
        "color": {
            "field": "properties.income_pc",
            "type": "quantitative",
            "scale": {
                "range": ["#fbeaa7","#fdf3b6","#fffbc6","#bcdb80","#5da45f"],
                "type": "threshold",
                "domain": [
                    15246.0,
                    17974.0,
                    23495.0,
                    33364.0
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
euro_gdp:
`{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 550,
    "height": 300,
    "title": "GDP in Thousands of Millions of USD",
    "background": "#191a1a",
    "data": {
        "values": "euro_gdp",
        "format": {
            "property": "features"
        }
    },
    "mark": "geoshape",
    "projection": {
        "type": "mercator"
    },
    "encoding": {
        "stroke": {
            "value": "white"
        },
        "color": {
            "field": "properties.gdp_md_est",
            "type": "quantitative",
            "scale": {
                "range": ["#bfc7c9","#a8beba","#84b0a6","#60a18c","#46936b","#317a49","#185632"],
                "type": "threshold",
                "domain": [
                    20000,
                    50000,
                    100000,
                    200000,
                    500000,
                    1000000
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