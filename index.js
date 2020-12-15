let pageIndex = 0;
const pages = [
  `<div class="container1">
                    <img src="./images/q1.png" alt=""></img>
                    <div class="question1">
                    what is 
                      <button class="option" value="corret" onclick="check(event)">
                        this
                      </button>
                      /
                      <button class="option" value="incorret" onclick="check(event)">
                        that
                      </button>
                      ?
                    </div>
                    <div class="question2">
                    .... an orange back
                      <button class="option" value="corret" onclick="check(event)">
                      they're
                      </button>
                      /
                      <button class="option" value="incorret" onclick="check(event)">
                      It's 
                      </button>
                    </div>
                  </div>`,
  `<div class="container2">
                    <img src="./images/q2.jpg" alt=""></img>
                    <div class="question1">
                    what are....
                      <button class="option" value="corret" onclick="check(event)">
                        these
                      </button>
                      /
                      <button class="option" value="incorret" onclick="check(event)">
                        those
                      </button>
                      ?
                    </div>
                    <div class="question2">
                      <button class="option" value="corret" onclick="check(event)">
                      It's 
                      </button>
                      /
                      <button class="option" value="incorret" onclick="check(event)">
                      they're
                      </button>
                      green pens
                    </div>
            
                  </div>`,
  `<div class="container3">
                    <img src="./images/q3.jpg" alt=""></img>
                    <div class="question1">
                    whats...
                      <button class="option" value="corret" onclick="check(event)">
                        this
                      </button>
                      /
                      <button class="option" value="incorret" onclick="check(event)">
                        that
                      </button>
                      ?
                    </div>
                    <div class="question2">
                      <button class="option" value="corret" onclick="check(event)">
                      It's 
                      </button>
                      /
                      <button class="option" value="incorret" onclick="check(event)">
                      they're
                      </button>
                      a blue calculator
                    </div>
            
                  </div>`,
  `<div class="container4">
                    <img src="./images/q4.png" alt=""></img>
                    <div class="question1">
                    what are...
                      <button class="option" value="corret" onclick="check(event)">
                        these
                      </button>
                      /
                      <button class="option" value="incorret" onclick="check(event)">
                        those
                      </button>
                      ?
                    </div>
                    <div class="question2">
                      <button class="option" value="corret" onclick="check(event)">
                      It's 
                      </button>
                      <button class="option" value="incorret" onclick="check(event)">
                      they're
                      </button>
                      yellow compasses
                    </div>
            
                  </div>`,
];

let questionState = [...Array(pages.length)];

function renderPage(page) {
  container = document.getElementsByClassName("main-container")[0];
  container.innerHTML = page;
}
function renderPageOnload() {
  document.getElementsByClassName("prev-btn")[0].disabled = true;
  document.getElementsByClassName("page-counter")[0].innerHTML = `${
    pageIndex + 1
  } of ${pages.length}`;
  renderPage(pages[pageIndex]);
}

function handleNav() {
  let prevBtn = document.getElementsByClassName("prev-btn")[0];
  let nextBtn = document.getElementsByClassName("next-btn")[0];
  if (pageIndex === 0) {
    prevBtn.disabled = true;
    nextBtn.disabled = false;
  } else if (pageIndex < pages.length - 1) {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  } else if (pageIndex === pages.length - 1) {
    nextBtn.disabled = true;
  }
  document.getElementsByClassName("page-counter")[0].innerHTML = `${
    pageIndex + 1
  } of ${pages.length}`;
  renderPage(pages[pageIndex]);

  if (questionState[pageIndex]) {
    Object.keys(questionState[pageIndex]).map((key) => {
      if (questionState[pageIndex][key]) {
        let container = document.getElementsByClassName(
          `container${pageIndex + 1}`
        )[0];

        let question = container.getElementsByClassName(`${key}`)[0];

        let options = question.getElementsByClassName("option");
        [...options].forEach((option) => {
          if (option.value === "corret") {
            option.classList.add("optionCorrect");
            option.disabled = true;
          } else if (option.value === "incorret") {
            option.classList.add("optionIncorrect");
            option.disabled = true;
          }
        });
      }
    });
  }
}
function navigatePage(state) {
  if (state === "next") {
    pageIndex++;
    handleNav();
  } else {
    pageIndex--;
    handleNav();
  }
}

function check(e) {
  let container = e.target.parentNode.parentNode.className;

  let questionClassname = e.target.parentNode.className;
  container = document.getElementsByClassName(container)[0];
  let question = container.getElementsByClassName(questionClassname)[0];
  let options = question.getElementsByClassName("option");
  if (e.target.value === "corret") {
    [...options].forEach((option) => {
      if (option.value === "corret") {
        option.classList.add("optionCorrect");
        option.disabled = true;
      } else if (option.value === "incorret") {
        option.classList.add("optionIncorrect");
        option.disabled = true;
      }
    });
    questionState[pageIndex] = { [questionClassname]: true };
  } else if (e.target.value === "incorret") {
    [...options].forEach((option) => {
      if (option.value === "incorret") {
        option.classList.add("showWrong");
        setTimeout(() => {
          option.classList.remove("showWrong");
        }, 3000);
      }
    });
  }
}

function showPopUp() {
  document.getElementsByClassName("pop-up")[0].style.display =
    document.getElementsByClassName("pop-up")[0].style.display === "none"
      ? "block"
      : "none";
}
function reset(e) {
  let highestContainer = e.target.parentNode;
  let mainContainer = document.getElementsByClassName("main-container")[0];
  let page = mainContainer.childNodes[0];
  let options = page.getElementsByClassName("option");
  [...options].forEach((option) => {
    option.classList.remove("optionCorrect", "optionIncorrect", "showWrong");
    option.disabled = false;
  });
  questionState[pageIndex] = {};
}
function showAnswer(e) {
  let highestContainer = e.target.parentNode;
  let mainContainer = document.getElementsByClassName("main-container")[0];
  let page = mainContainer.childNodes[0];
  let options = page.getElementsByClassName("option");

  [...options].forEach((option) => {
    if (option.value === "corret") {
      option.classList.add("optionCorrect");
      option.disabled = true;
    } else if (option.value === "incorret") {
      option.classList.add("optionIncorrect");
      option.disabled = true;
    }
  });
  questionState[pageIndex] = { question1: true, question2: true };
}

function resetAll() {
  let options = document.getElementsByClassName("option");
  [...options].forEach((option) => {
    option.classList.remove("optionCorrect", "optionIncorrect", "showWrong");
    option.disabled = false;
  });
  questionState = [...Array(pages.length)];
  pageIndex = 0;
  handleNav();
}
