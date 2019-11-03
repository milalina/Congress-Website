creating_Url()

function creating_Url() {
    let value = " ";
    if (document.title.includes("Senate")) {
        value = "senate"
    } else {
        value = "house"
    }
    let url = "https://api.propublica.org/congress/v1/116/" + value + "/members.json"
    fetchingData(url)
}

function fetchingData(url) {

    fetch(url, {
            method: "GET",
            headers: {
                "X-API-Key": "pwaHYLY2XBBDFcdsVoQ7KhmtyYTvQV8WzxMTFuXi"
            }
        })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data.results[0].members);
            let memberArray = data.results[0].members;
            renderDataPages(memberArray);
            count_party_members("D", memberArray);
            count_party_members("R", memberArray);
            count_party_members("I", memberArray);
            voted_with_party("D", memberArray)
            voted_with_party("R", memberArray)
            voted_with_party("I", memberArray)
            members_lowest_Attendance(memberArray);
            members_highest_Attendance(memberArray);
            members_highest_Loyalty(memberArray);
            members_lowest_Loyalty(memberArray);

        })
        .catch(function (error) {
            console.log(error);
        });
}

var statistics = [{
    "democrats": {
        "number_of": "0",
        "number_missed_votes": "0",
        "percentage_missed": "0",
    },
    "republicans": {
        "number_of": "0",
        "number_missed_votes": "0",
        "percentage_missed": "0",
    },
    "independents": {
        "number_of": "0",
        "number_missed_votes": "0",
        "percentage_missed": "0",
    },
    "politicians": {
        "total_number": "0",
        "total_percentage_party_votes": "0"
    },
    "least_engaged": [],
    "most_engaged": [],
    "least_loyal": [],
    "most_loyal": []
}]

//House/Senate Data, overview table

function renderDataPages(array) {
    if (document.title.includes("Data")) {

        function handleEvent(array) {
            document.addEventListener("change", function () {
                overviewTable(array);
            });
        }


        function overviewTable(array) {
            var b = Array.from(document.querySelectorAll("input[name=party]:checked")).map(elt => elt.value); // an array for storing values of checkboxes
            var dropMenuState = Array.from(document.querySelectorAll("select[id=state-filter]")).map(elt => elt.value);
            console.log(dropMenuState)
            var arrayParty = []; // an empty array for pushing party members  
            for (i = 0; i < array.length; i++) {
                if (b.indexOf(array[i].party) !== -1 &&
                    (dropMenuState[0] === "allStates" || array[i].state == dropMenuState[0])) {
                    arrayParty.push(array[i])
                };

            }
            console.log(arrayParty)
            let table;

            for (j = 0; j < arrayParty.length; j++) {

                var middleName = arrayParty[j].middle_name;
                var memberName;
                if (middleName == null) {
                    memberName = arrayParty[j].first_name + " " + arrayParty[j].last_name;
                } else {
                    memberName = arrayParty[j].first_name + " " + middleName + " " + arrayParty[j].last_name;
                }
                table +=
                    "<tr>" +
                    "<td>" + (j + 1) + "</td>" +
                    "<td>" + "<a href=" + arrayParty[j].url + ">" + memberName + "</a>" + "</td>" +
                    "<td>" + arrayParty[j].seniority + "</td>" +
                    "<td>" + arrayParty[j].votes_with_party_pct + "</td>" +
                    "<tr>"

            }

            document.getElementById("congress-data").innerHTML = table

        }

        //dropdown menu 

        function loadMyData(array) {
            var unalphArrayD = [];
            var alphArrayD = [];
            var alphArray_non_D = [];
            for (i = 0; i < array.length; i++) {
                unalphArrayD.push(array[i].state)
            };
            alphArrayD = unalphArrayD.sort();

            console.log(alphArrayD)
            for (i = 0; i < alphArrayD.length; i++) {
                var state = alphArrayD[i]
                if (!alphArray_non_D.includes(state)) {
                    alphArray_non_D.push(state)
                }
            };

            console.log(alphArray_non_D)
            for (i = 0; i < alphArray_non_D.length; i++) {
                var state = alphArray_non_D[i]
                var dropMenu = "<option>" + state + "</option>"
                document.getElementById("state-filter").innerHTML += dropMenu
            }
        }
        handleEvent(array);
        loadMyData(array);
    }
}

//statistics

function count_party_members(value, array) {
    var array_party_members = [];
    for (i = 0; i < array.length; i++) {
        if (array[i].party == value) {
            array_party_members.push(array[i])
        }
    }
    if (value == "D") {
        statistics[0].democrats.number_of = " " + array_party_members.length;

    };
    if (value == "R") {
        statistics[0].republicans.number_of = " " + array_party_members.length
    };

    if (value == "I") {
        statistics[0].independents.number_of = " " + array_party_members.length
    };
    count_party_members_total()
}



//counting total of party members
function count_party_members_total() {
    a = parseInt(statistics[0].democrats.number_of) + parseInt(statistics[0].republicans.number_of) + parseInt(statistics[0].independents.number_of);
    statistics[0].politicians.total_number = " " + a;
}

//counting percentage of voted with party
function voted_with_party(value, array) {
    array_voted_with_party = [];
    for (i = 0; i < array.length; i++) {
        if (array[i].party == value) {
            array_voted_with_party.push(array[i].votes_with_party_pct)
        }
    }
    if (value == "D" && array_voted_with_party.length !== 0) {
        let total = 0;
        for (j = 0; j < array_voted_with_party.length; j++) {
            total += array_voted_with_party[j];
        };
        statistics[0].democrats.percentage_party_votes = " " + Math.round(total / array_voted_with_party.length);
    };
    if (value == "R" && array_voted_with_party.length !== 0) {
        let total = 0;
        for (j = 0; j < array_voted_with_party.length; j++) {
            if (array_voted_with_party[j] !== undefined) {
                total += array_voted_with_party[j];
            }
        };
        console.log(array_voted_with_party)
        statistics[0].republicans.percentage_party_votes = " " + Math.round(total / array_voted_with_party.length);
    };
    if (value == "I" && array_voted_with_party.length !== 0) {
        let total = 0;
        for (j = 0; j < array_voted_with_party.length; j++) {};
        statistics[0].independents.percentage_party_votes = " " + Math.round(total / array_voted_with_party.length);

    };
    statistics[0].independents.percentage_party_votes = "0";

    count_total_percentage_party_votes()

}

function members_highest_Attendance(array) {

    for (i = 0; i < array.length; i++) {
        array.sort((a, b) => (b.missed_votes_pct < a.missed_votes_pct) ? 1 : -1)
    }
    let length = array.length;
    let = cutting_point_lowest = Math.round(length * 0.1);
    statistics[0].most_engaged = array.filter(function (oneMember) {
        return oneMember.missed_votes <= array[cutting_point_lowest].missed_votes
    })
    createTableBodyAttendance()
}

//counting total for percentage_party_votes


function count_total_percentage_party_votes() {
    statistics[0].politicians.total_percentage_party_votes = " ";
    let c = [];
    let a = [statistics[0].democrats.percentage_party_votes, statistics[0].republicans.percentage_party_votes,
        statistics[0].independents.percentage_party_votes
    ];
    let m = 0;
    for (i = 0; i < a.length; i++) {
        if (a[i] > 0) {
            c.push(a[i]);
        }
    }
    for (j = 0; j < c.length; j++) {
        m += parseInt(c[j]);
        statistics[0].politicians.total_percentage_party_votes = parseInt(m / c.length);
    }

    at_a_glance_talbe()

}



//table: senate at glance

function at_a_glance_talbe() {
    var table =
        "<tr>" +
        "<td>Democrats</td>" +
        "<td>" + statistics[0].democrats.number_of + "</td>" +
        "<td>" + statistics[0].democrats.percentage_party_votes + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Republicans</td>" +
        "<td>" + statistics[0].republicans.number_of + "</td>" +
        "<td>" + statistics[0].republicans.percentage_party_votes + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Independents</td>" +
        "<td>" + statistics[0].independents.number_of + "</td>" +
        "<td>" + statistics[0].independents.percentage_party_votes + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Total</td>" +
        "<td>" + statistics[0].politicians.total_number + "</td>" +
        "<td>" + statistics[0].politicians.total_percentage_party_votes + "</td>" +
        "</tr>"


    document.getElementById("table").innerHTML = table
}



function members_lowest_Attendance(array) {
    console.log(array)
    for (i = 0; i < array.length; i++) {
        array.sort((a, b) => (a.missed_votes_pct < b.missed_votes_pct) ? 1 : -1)
    }
    let length = array.length
    let cutting_point_highest = Math.round(length * 0.1);

    statistics[0].least_engaged = array.filter(function (oneMember) {
        return oneMember.missed_votes >= array[cutting_point_highest].missed_votes
    })

}



function members_highest_Attendance(array) {

    for (i = 0; i < array.length; i++) {
        array.sort((a, b) => (b.missed_votes_pct < a.missed_votes_pct) ? 1 : -1)
    }
    let length = array.length;
    let = cutting_point_lowest = Math.round(length * 0.1);
    statistics[0].most_engaged = array.filter(function (oneMember) {
        return oneMember.missed_votes <= array[cutting_point_lowest].missed_votes
    })
    createTableBodyAttendance()
}


function members_lowest_Loyalty(array) {

    for (i = 0; i < array.length; i++) {
        array.sort((a, b) => (a.votes_with_party_pct < b.votes_with_party_pct) ? 1 : -1)
    }

    let length = array.length
    let cutting_point_highest = Math.round(length * 0.9);

    statistics[0].least_loyal = array.filter(function (oneMember) {
        return oneMember.votes_with_party_pct <= array[cutting_point_highest].votes_with_party_pct

    })
    console.log(statistics[0].least_loyal)
    createTableBodyLoyalty()
}


function members_highest_Loyalty(array) {

    for (i = 0; i < array.length; i++) {
        array.sort((a, b) => (b.votes_with_party_pct > a.votes_with_party_pct) ? 1 : -1)
    }

    let length = array.length;
    let = cutting_point_lowest = Math.round(length * 0.1);
    statistics[0].most_loyal = array.filter(function (oneMember) {
        return oneMember.votes_with_party_pct >= array[cutting_point_lowest].votes_with_party_pct
    })
    //generate_table(highest_loyalty, "table_most_loyal")

    createTableBodyLoyalty()
}


function createTableBodyLoyalty() {
    if (document.title.includes("Loyalty")) {
        function createTableBodyL(array, id) {
            for (j = 0; j < array.length; j++) {

                var middleName = array[j].middle_name;
                var memberName;
                if (middleName == null) {
                    memberName = array[j].first_name + " " + array[j].last_name;
                } else {
                    memberName = array[j].first_name + " " + middleName + " " + array[j].last_name;
                }

                var row = document.createElement("tr");
                let tableContent = [memberName, Math.round(array[j].votes_with_party_pct * array[j].total_votes / 100), array[j].votes_with_party_pct]
                for (c = 0; c < tableContent.length; c++) {
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(tableContent[c]);
                    cell.appendChild(cellText);
                    row.appendChild(cell)
                }
                document.getElementById(id).appendChild(row);

            }
        }
        createTableBodyL(statistics[0].most_loyal, "table_most_loyal");
        createTableBodyL(statistics[0].least_loyal, "table_least_loyal")
        console.log(statistics)
    }
};

function createTableBodyAttendance() {
    if (document.title.includes("Attendance")) {
        function createTableBodyA(array, id) {
            for (j = 0; j < array.length; j++) {

                var middleName = array[j].middle_name;
                var memberName;
                if (middleName == null) {
                    memberName = array[j].first_name + " " + array[j].last_name;
                } else {
                    memberName = array[j].first_name + " " + middleName + " " + array[j].last_name;
                }

                var row = document.createElement("tr");
                let tableContent = [memberName, array[j].missed_votes, Math.round(array[j].missed_votes_pct)]
                for (c = 0; c < tableContent.length; c++) {
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(tableContent[c]);
                    cell.appendChild(cellText);
                    row.appendChild(cell)
                }
                document.getElementById(id).appendChild(row);

            }
        }
        createTableBodyA(statistics[0].most_engaged, "table_most_engaged");
        createTableBodyA(statistics[0].least_engaged, "table_least_engaged")
        console.log(statistics[0].least_engaged)
    }
}

/*function voted_with_party(value, array) {
    array_voted_with_party = [];
    for (i = 0; i < array.length; i++) {
        if (array[i].party == value) {
            array_voted_with_party.push(array[i].votes_with_party_pct)
        }
    }
    if (value == "D" && array_voted_with_party.length !== 0) {
        let total = 0;
        for (j = 0; j < array_voted_with_party.length; j++) {
            total += array_voted_with_party[j];
        };
        statistics[0].democrats.percentage_party_votes = " " + Math.round(total / array_voted_with_party.length);
    };
    if (value == "R" && array_voted_with_party.length !== 0) {
        let total = 0;
        for (j = 0; j < array_voted_with_party.length; j++) {
            if (array_voted_with_party[j] !== undefined)
            {total += array_voted_with_party[j];}
        };
        console.log(array_voted_with_party)
        statistics[0].republicans.percentage_party_votes = " " + Math.round(total / array_voted_with_party.length);
    };
    if (value == "I" && array_voted_with_party.length !== 0) {
        let total = 0;
        for (j = 0; j < array_voted_with_party.length; j++) {
        };
        statistics[0].independents.percentage_party_votes = " " + Math.round(total / array_voted_with_party.length);
        
    };
    statistics[0].independents.percentage_party_votes = "0";

    count_total_percentage_party_votes()

}*/