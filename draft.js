function myFunction(item) {
    var b = Array.from(document.querySelectorAll("input[name=party]:checked")).map(elt => elt.value);// an array for storing values of checkboxes
    var arrayParty =[];// an empty array for pushing party members   
    for (i=0; i<memberArray.length; i++){
    if (b.indexOf(memberArray[i].party)==! -1) {arrayParty.push(memberArray[i])};
    } 
    
    console.log(arrayParty)} //end of myFunction()



function myFunction(item) {
var b = Array.from(document.querySelectorAll("input[name=party]:checked")).map(elt => elt.value);// an array for storing values of checkboxes
console.log(b)
var arrayParty =[];// an empty array for pushing party members   
for (i=0; i<data.results[0].members.length; i++){
        if (b.indexOf(data.results[0].members[i].party)==! -1) {arrayParty.push(data.results[0].members[i])};

        for (j=0; j<arrayParty.members.length; j++)
            
                    {var middleName=arrayParty.members[j].middle_name;
                    
                    var memberName;
                    if (middleName == null){memberName = arrayParty.members[j].first_name+" "+arrayParty.members[j].last_name;}
                    else {memberName = arrayParty.members[j].first_name+" "+middleName+" "+arrayParty.members[j].last_name;}
                
                    table +="<tbody>"+
                                "<tr>"+
                                    "<td>"+(i+1)+"</td>"+
                                    "<td>"+"<a href="+arrayParty.members[j].url+">"+ memberName+"</a>"+"</td>"+
                                    "<td>"+arrayParty.members[j].party+"</td>"+
                                    "<td>"+arrayParty.members[j].state+"</td>"+
                                    "<td>"+arrayParty.members[j].seniority+"</td>"+
                                    "<td>"+arrayParty.members[j].votes_with_party_pct+"</td>"+
                                "<tr>"+
                            "<tbody>"}
                
                document.getElementById("senate-data").innerHTML = table
        } 
}

function generate_table(array, id) {

    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    function createTableHeader() {
        var row = document.createElement("tr");
        //row 1
        let titles = ["Name", "No. Missed Votes", "% Missed"];
        let a = 0;
        for (a = 0; a < titles.length; a++) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode(titles[a]);
            cell.appendChild(cellText);
            row.appendChild(cell)
        }
        tblBody.appendChild(row);
        document.getElementById(id).appendChild(tbl);
        //tbl.setAttribute("border", "2");
    }
    createTableHeader()

    function createTableBody() {
        for (j = 0; j < array.length; j++) {

            var middleName = array[j].middle_name;
            var memberName;
            if (middleName == null) {
                memberName = array[j].first_name + " " + array[j].last_name;
            } else {
                memberName = array[j].first_name + " " + middleName + " " + array[j].last_name;
            }

            var row = document.createElement("tr");
            let tableContent = [memberName, array[j].missed_votes, Math.round(array[j].missed_votes / array[j].total_votes * 100)]
            for (c = 0; c < tableContent.length; c++) {
                var cell = document.createElement("td");
                var cellText = document.createTextNode(tableContent[c]);
                cell.appendChild(cellText);
                row.appendChild(cell)
            }
            tblBody.appendChild(row);
            tbl.appendChild(tblBody);
            //tbl.setAttribute("border", "2");
            document.getElementById(id).appendChild(tbl);

        }
    }
    createTableBody()
}

generate_table(lowest_attendance, "table_least_engaged");

generate_table(highest_attendance, "table_most_engaged");

//24.06.19

function count_party_members(value) {
    var array_party_members = [];
    for (i = 0; i < memberArray.length; i++) {
        if (memberArray[i].party == value) {
            array_party_members.push(memberArray[i])
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
}

count_party_members("D")
count_party_members("R");
count_party_members("I");

//counting total of party members
function count_party_members_total() {
    a = parseInt(statistics[0].democrats.number_of) + parseInt(statistics[0].republicans.number_of) + parseInt(statistics[0].independents.number_of);
    statistics[0].politicians.total_number = " " + a;
}
count_party_members_total()


//counting percentage of voted with party
function voted_with_party(value) {
    array_voted_with_party = [];
    for (i = 0; i < memberArray.length; i++) {
        if (memberArray[i].party == value) {
            array_voted_with_party.push(memberArray[i].votes_with_party_pct)
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
            total += array_voted_with_party[j];
        };
        statistics[0].republicans.percentage_party_votes = " " + Math.round(total / array_voted_with_party.length);
    };
    if (value == "I" && array_voted_with_party.length !== 0) {
        let total = 0;
        for (j = 0; j < array_voted_with_party.length; j++) {
            total += array_voted_with_party[j];
        };
        statistics[0].independents.percentage_party_votes = " " + Math.round(total / array_voted_with_party.length);
    };



}

voted_with_party("D")
voted_with_party("R")
voted_with_party("I")

//counting total for percentage_party_votes
statistics[0].politicians.total_percentage_party_votes = " ";

function count_total_percentage_party_votes() {
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
   

}

count_total_percentage_party_votes()

//table: senate at glance

function at_a_glance_talbe(id) {
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


    document.getElementById(id).innerHTML = table
}

at_a_glance_talbe("table")