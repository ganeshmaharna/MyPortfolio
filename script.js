console.log("hello");


// $(document).ready(function() {
//code for reappearing menu on scroll
// $(window).scroll(function() {
//     if ($(this).scrollTop() > 20) {
//         $(".header").addClass("fixed")
//     } else {
//         $(".header").removeClass("fixed");
//     }
// });

//code for menu toggle
// $('.menu-btn').click(function() {
//     $('.header .menu').toggleClass('active');
//     $('.menu-btn i').toggleClass('active');
// })
// });

/*code for menu toggle using vanilla javascript start*/
const menuBtn = document.querySelector(".menu-btn");
menuBtn.addEventListener("click", function() {
    document.querySelector(".header .menu").classList.toggle("active");
    document.querySelector(".menu-btn i").classList.toggle("active");
});
let menuLink = document.querySelectorAll(".header .menu li a");
menuLink.forEach(function(index) {
    let a = index;
    a.addEventListener("click", function(e) {
        // console.log(e.target);
        document.querySelector(".header .menu").classList.remove("active");
        document.querySelector(".menu-btn i").classList.remove("active");
    })
});
// console.log(e.target);
// document.querySelector(".header .menu").classList.remove("active");



// console.log(menuLink);
/*code for menu toggle using vanilla javascript end*/


/* code for reapearing menu on scroll using javascript */
this.window.addEventListener('scroll', function() {
    if (this.window.pageYOffset > 20) {
        this.document.querySelector(".header").classList.add("fixed");
    } else {
        this.document.querySelector(".header").classList.remove("fixed");
    }
    if (this.window.pageYOffset > 500) {
        this.document.querySelector(".scroll-up-btn").classList.add("show");
    } else {
        this.document.querySelector(".scroll-up-btn").classList.remove("show");
    }
});
// Code for sliding up btn start
const slidingupBtn = document.querySelector('.scroll-up-btn');
slidingupBtn.addEventListener("click", function(e) {
    window.scrollTo(0, 0);
});
// code for sliding up btn end
/* code for reapearing menu on scroll using javascript */

/* ------------------Filter Portfolio item start-------------- */

/* Toggle Body Scrolling */
function toggleBodyScrolling() {
    document.body.classList.toggle("hidden-scrolling");
}
/*----------Active filter-btn on click function start------------*/
const filterBtnsContainer = document.querySelector(".portfolio-filter");
let portfolioItems;
filterBtnsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("portfolio-filter-btn") && !e.target.classList.contains("active")) {
            filterBtnsContainer.querySelector(".active").classList.remove("active");
            e.target.classList.add("active");
            // toggleBodyScrolling();
            document.querySelector(".filter-status").classList.add("active");
            document.querySelector(".filter-status p").innerHTML = `filtering <span>${e.target.innerHTML}</span> works`;
            setTimeout(() => {
                filterItems(e.target);
            }, 400);
            setTimeout(() => {
                document.querySelector(".filter-status").classList.remove("active");
                // toggleBodyScrolling();
            }, 800);
        }
    })
    /*----------Active filter-btn on click function start------------*/


/*split() method 
   It breaks the string up into separate string according to a delimeter passed as its first argument.The result is return in an array. 
*/


function filterItems(filterBtn) {
    const selectCategory = filterBtn.getAttribute("data-filter");
    console.log(selectCategory);
    document.querySelectorAll(".portfolio-item").forEach((item) => {
        const category = item.getAttribute("data-category").split(',');
        // console.log(category);
        // console.log(item);
        // console.log(category.indexOf(selectCategory));
        if (category.indexOf(selectCategory) !== -1 || selectCategory == "all") {
            item.classList.add("show");
        } else {
            item.classList.remove("show");
        }
    });
    portfolioItems = document.querySelectorAll(".portfolio-item.show");
    // console.log(portfolioItems);
}
// Filter Active Category Portfolio Items
filterItems(document.querySelector(".portfolio-filter-btn.active"));

/* ---------------Filter Portfolio item end------------------ */


// Portfolio Item Details Popup

let portfolioItemIndex;
document.addEventListener("click", (e) => {
    if (e.target.closest(".portfolio-item")) {
        const currentItem = e.target.closest(".portfolio-item");
        // console.log(currentItem);
        portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);
        // console.log(portfolioItemIndex);
        togglePopup();
        portfolioItemDetails();
    }
});



function togglePopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    toggleBodyScrolling();
}
document.querySelector(".pp-close-btn").addEventListener("click", togglePopup);

function portfolioItemDetails() {
    document.querySelector(".pp-thumbnail img").src =
        portfolioItems[portfolioItemIndex].querySelector("img").src;
    document.querySelector(".pp-header h3").innerHTML =
        portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-title").innerHTML;
    document.querySelector(".pp-body").innerHTML =
        portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-details").innerHTML;
    document.querySelector(".pp-counter").innerHTML = `${portfolioItemIndex+1} of ${portfolioItems.length} (<span title="category">${document.querySelector(".portfolio-filter-btn.active").innerHTML}</span>)`;
    updateNextPrevItem();
}


function updateNextPrevItem() {
    if (portfolioItemIndex !== 0) {
        document.querySelector(".pp-footer-left").classList.remove("hidden");
        document.querySelector(".pp-footer-left h3").innerHTML = portfolioItems[portfolioItemIndex - 1].querySelector("h3").innerHTML;

        document.querySelector(".pp-footer-left img").src = portfolioItems[portfolioItemIndex - 1].querySelector("img").src;
    } else {
        document.querySelector(".pp-footer-left").classList.add("hidden");
    }
    if (portfolioItemIndex !== portfolioItems.length - 1) {
        document.querySelector(".pp-footer-right").classList.remove("hidden");
        document.querySelector(".pp-footer-right h3").innerHTML = portfolioItems[portfolioItemIndex + 1].querySelector("h3").innerHTML;

        document.querySelector(".pp-footer-right img").src = portfolioItems[portfolioItemIndex + 1].querySelector("img").src;
    } else {
        document.querySelector(".pp-footer-right").classList.add("hidden");
    }
}

document.querySelector(".pp-prev-btn").addEventListener("click", () => {
    changePortfolioItem("prev");
});
document.querySelector(".pp-next-btn").addEventListener("click", () => {
    changePortfolioItem("next");
});

function changePortfolioItem(direction) {
    if (direction == "prev") {
        portfolioItemIndex--;
    } else {
        portfolioItemIndex++;
    }
    // document.querySelector(".pp-overlay").classList.add(direction);
    setTimeout(() => {
        document.querySelector(".pp-inner").scrollTo(0, 0);
        portfolioItemDetails();
        updateNextPrevItem();
    }, 100);

    // setTimeout(() => {
    //     document.querySelector(".pp-overlay").classList.add(direction);
    // }, 1000);

}


/* ------------- Filter items end-------------*/