let pageIndex = 0;
const pages = [
  {
    container: "container1",
    image: "./images/q1.png",
    question1: {
      option_1: { label: "this", value: "correct" },
      option_2: { label: "that", value: "incorrect" },
      before: "What's",
      after: "/",
      last: "?",
    },
    question2: {
      option_1: { label: "It's", value: "correct" },
      option_2: { label: "They're", value: "incorrect" },
      between: "/",
      after: "an orange school bag.",
    },
  },
  {
    container: "container2",
    image: "./images/q2.png",
    question1: {
      option_1: { label: "these", value: "incorrect" },
      option_2: { label: "those", value: "correct" },
      before: "What are",
      after: "/",
      last: "?",
    },
    question2: {
      option_1: { label: "It's", value: "incorrect" },
      option_2: { label: "They're", value: "correct" },
      between: "/",
      after: "green pens.",
    },
  },
  {
    container: "container3",
    image: "./images/q3.png",
    question1: {
      option_1: { label: "this", value: "incorrect" },
      option_2: { label: "that", value: "correct" },
      before: "What's",
      after: "/",
      last: "?",
    },
    question2: {
      option_1: { label: "It's", value: "correct" },
      option_2: { label: "They're", value: "incorrect" },
      between: "/",
      after: "a blue calculator.",
    },
  },
  {
    container: "container4",
    image: "./images/q4.png",
    question1: {
      option_1: { label: "these", value: "correct" },
      option_2: { label: "those", value: "incorrect" },
      before: "What's",
      after: "/",
      last: "?",
    },
    question2: {
      option_1: { label: "It's", value: "incorrect" },
      option_2: { label: "They're", value: "correct" },
      between: "/",
      after: "yellow compasses.",
    },
  },
];

let questionState = [...Array(pages.length)];

function renderPage(page) {
  container = document.getElementsByClassName("main-container")[0];

  container.innerHTML = `<div class="${page.container}">

    <image src="${"./assets" + page.image}" alt="image"></image> 
    <div class="question1">
<span> ${page.question1.before}</span>
<button
  class="option"
  value="${page.question1.option_1.value}"
  onclick="check(event)"
>
  ${page.question1.option_1.label}
</button>
<span> ${page.question1.after}</span>
<button
  class="option"
  value="${page.question1.option_2.value}"
  onclick="check(event)"
>
  ${page.question1.option_2.label}
</button>
<span> ${page.question1.last}</span>
</div>
<div class="question2">
<button
  class="option"
  value="${page.question2.option_1.value}"
  onclick="check(event)"
>
  ${page.question2.option_1.label}
</button>
<span> ${page.question2.between}</span>
<button
  class="option"
  value="${page.question2.option_2.value}"
  onclick="check(event)"
>
  ${page.question2.option_2.label}
</button>
<span> ${page.question2.after}</span>
</div>
</div>`;
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
          pages[pageIndex].container
        )[0];

        let question = container.getElementsByClassName(`${key}`)[0];

        let options = question.getElementsByClassName("option");
        [...options].forEach((option) => {
          if (option.value === "correct") {
            option.classList.add("optionCorrect");
            option.disabled = true;
          } else if (option.value === "incorrect") {
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
  if (e.target.value === "correct") {
    [...options].forEach((option) => {
      if (option.value === "correct") {
        option.classList.add("optionCorrect");
        option.disabled = true;
      } else if (option.value === "incorrect") {
        option.classList.add("optionIncorrect");
        option.disabled = true;
      }
    });
    questionState[pageIndex] = questionState[pageIndex]
      ? { [questionClassname]: true, ...questionState[pageIndex] }
      : { [questionClassname]: true };
  } else if (e.target.value === "incorrect") {
    [...options].forEach((option) => {
      if (option.value === "incorrect") {
        option.classList.add("showWrong");
        setTimeout(() => {
          option.classList.remove("showWrong");
        }, 3000);
      }
    });
  }
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
    if (option.value === "correct") {
      option.classList.add("optionCorrect");
      option.disabled = true;
    } else if (option.value === "incorrect") {
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

function showPopUp() {
  document.getElementsByClassName("pop-up")[0].style.display =
    document.getElementsByClassName("pop-up")[0].style.display === "none"
      ? "block"
      : "none";
}
