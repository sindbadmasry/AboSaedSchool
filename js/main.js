var multipleItemCarousel = document.querySelector(`#carouselExampleControls`);
if (window.matchMedia("(min-width:576px)").matches) {
    var carousel = new bootstrap.Carousel(multipleItemCarousel,
        {
            interval: false
        })
    var carouselWidth = $(`.carousel-inner`)[0].scrollWidth;
    var cardWidth = $(`.carousel-item`).width();
    var scrollPosition = 0;
    $(`.carousel-control-next`).on(`click`, function () {
        if (scrollPosition < (carouselWidth - (cardWidth * 4))) {
            scrollPosition = scrollPosition + cardWidth;
            $(`.carousel-inner`).animate({ scrollLeft: scrollPosition }, 600);
        }
    });
    $(`.carousel-control-prev`).on(`click`, function () {
        if (scrollPosition > 0) {
            scrollPosition = scrollPosition - cardWidth;
            $(`.carousel-inner`).animate({ scrollLeft: scrollPosition }, 600);
        }
    })
} else {
    $(multipleItemCarousel).addClass(`slide`);
}
let mainData;
let searchBar = document.getElementById("search-input");
let searchButton = document.getElementById("searchButton");
let yearN = document.getElementById("yNumber");
yearN.addEventListener("change", function () {
    callTserver.open("GET", `./${yearN.value}.json`);
    callTserver.send();
})
let callTserver = new XMLHttpRequest();
callTserver.open("GET", `./${yearN.value}.json`);
callTserver.send();
callTserver.addEventListener("load", function () {
    mainData = JSON.parse(callTserver.responseText);
    searchButton.addEventListener("click", () => {
        for (let i = 0; i < Object.keys(mainData).length; i++) {
            let counter = 0;
            let i2 = 0;
            let ress = document.getElementsByClassName("v");
            if (searchBar.value == mainData[i].id || (mainData[i].name.startsWith(searchBar.value) && searchBar.value != "")) {
              if(yearN.value == "year1" ||yearN.value == "year2"||yearN.value == "year3"){
                document.getElementById("errMessage").style.display = "none";
                document.getElementById("resultTable45").style.display = "none";
                document.getElementById("resultTable6").style.display = "none";
                document.getElementById("resultTable123").style.display = "table";
                console.log("")
              }else if(yearN.value == "year4"||yearN.value == "year5"){
                document.getElementById("errMessage").style.display = "none";
                document.getElementById("resultTable123").style.display = "none";
                document.getElementById("resultTable6").style.display = "none";
                document.getElementById("resultTable45").style.display = "table";
              }else if(yearN.value == "year6"){
                document.getElementById("errMessage").style.display = "none";
                document.getElementById("resultTable123").style.display = "none";
                document.getElementById("resultTable45").style.display = "none";
                document.getElementById("resultTable6").style.display = "table";
              }

                for (; i2 < ress.length; i2++) {
                    let idHT = ress[i2].id;
                    ress[i2].textContent = mainData[i][idHT];
                    if (ress[i2].textContent == "أزرق") {
                        ress[i2].style.background = "blue";
                        ress[i2].style.color = "blue";
                    } else if (ress[i2].textContent == "أخضر") {
                        ress[i2].style.background = "green";
                        ress[i2].style.color = "green";
                    } else if (ress[i2].textContent == "أصفر") {
                        ress[i2].style.background = "yellow";
                        ress[i2].style.color = "yellow";
                    } else if (ress[i2].textContent == "أحمر") {
                        ress[i2].style.background = "red";
                        ress[i2].style.color = "red";
                    }
                }
                //console.log(document.getElementById("yNumber").value);
                //console.log(mainData[i]);
                counter++;
                break;
            } else if (i == Object.keys(mainData).length - 1 && counter == 0) {
                document.getElementById("resultTable123").style.display = "none";
                document.getElementById("resultTable45").style.display = "none";
                document.getElementById("resultTable6").style.display = "none";
                document.getElementById("errMessage").style.display = "block";

            }
        }
    }
    )
})
