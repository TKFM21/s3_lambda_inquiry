const URL = "https://";

const LOADING = "処理中...";
const RESULT_OK = "リクエストを受け付けました。";
const RESULT_OK_DETAIL =
  "正常に処理が完了すると'support@cooling-qc.com'からメールが配信されます。";
const RESULT_NG = "リクエストの受付に失敗しました";
const RESULT_NG_DETAIL =
  "大変申し訳ありません。C-QCへ直接お問い合わせください。";
const SANYO_DOMAIN = "@sanyodenki.com";
document.getElementById("email").value = SANYO_DOMAIN;

(() => {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modal-content");
  const sendBtn = document.getElementById("submitBtn");
  const span = document.getElementsByClassName("close")[0];
  const result = document.getElementById("result");
  const form = document.getElementById("form");
  const nameAlert = document.getElementById("name-alert");
  const emailAlert = document.getElementById("email-alert");
  const deptAlert = document.getElementById("dept-alert");
  const bodyAlert = document.getElementById("body-alert");
  const resultDetail = document.getElementById("detail");

  const inputValueClear = () => {
    form.name.value = "";
    form.name.setAttribute("class", "");
    form.email.value = SANYO_DOMAIN;
    form.email.setAttribute("class", "");
    form.dept.value = "";
    form.dept.setAttribute("class", "");
    form.body.value = "";
    form.body.setAttribute("class", "");
    result.innerHTML = "";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = () => {
    if (result.innerHTML !== LOADING) {
      modal.style.display = "none";
      if (result.innerHTML === RESULT_OK) inputValueClear();
    }
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = event => {
    if (event.target === modal) {
      if (result.innerHTML !== LOADING) {
        modal.style.display = "none";
        if (result.innerHTML === RESULT_OK) inputValueClear();
      }
    }
  };

  sendBtn.addEventListener("click", async event => {
    event.preventDefault();
    const name = form.name.value.trim();
    form.name.value = name;
    const email = form.email.value.trim();
    form.email.value = email;
    const dept = form.dept.value.trim();
    form.dept.value = dept;
    const body = form.body.value.trim();
    form.body.value = body;

    // validation check
    if (validation(name, email, dept, body)) return;

    result.innerHTML = LOADING;
    modalContent.setAttribute("class", "request-loading");
    modal.style.display = "block";
    const jsonData = JSON.stringify({ name, email, dept, body });

    try {
      const res = await fetch(URL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        body: jsonData,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      });
      console.log("Response!!", res.status);
      modalContent.setAttribute("class", "request-success");
      result.innerHTML = RESULT_OK;
      resultDetail.innerHTML = RESULT_OK_DETAIL;
    } catch (error) {
      console.log(error);
      modalContent.setAttribute("class", "request-fail");
      result.innerHTML = RESULT_NG;
      resultDetail.innerHTML = RESULT_NG_DETAIL;
    }
  });

  const validation = (name, email, dept, body) => {
    let validationResult = false;
    if (!name.length) {
      form.name.setAttribute("class", "alert-red");
      nameAlert.hidden = false;
      validationResult = true;
    } else {
      form.name.setAttribute("class", "alert-green");
      nameAlert.hidden = true;
    }
    if (!email.length || !/^[^@]+@sanyodenki.com$/.test(email)) {
      form.email.setAttribute("class", "alert-red");
      emailAlert.hidden = false;
      validationResult = true;
    } else {
      form.email.setAttribute("class", "alert-green");
      emailAlert.hidden = true;
    }
    if (!dept.length) {
      form.dept.setAttribute("class", "alert-red");
      deptAlert.hidden = false;
      validationResult = true;
    } else {
      form.dept.setAttribute("class", "alert-green");
      deptAlert.hidden = true;
    }
    if (!body.length) {
      form.body.setAttribute("class", "alert-red");
      bodyAlert.hidden = false;
      validationResult = true;
    } else {
      form.body.setAttribute("class", "alert-green");
      bodyAlert.hidden = true;
    }
    return validationResult;
  };

  form.name.addEventListener("input", event => {
    const name = event.target.value.trim();
    if (!name) {
      event.target.setAttribute("class", "alert-red");
      nameAlert.hidden = false;
    } else {
      event.target.setAttribute("class", "alert-green");
      nameAlert.hidden = true;
    }
  });

  form.email.addEventListener("input", event => {
    const email = event.target.value.trim();
    event.target.value = email;
    if (!email || !/^[^@]+@sanyodenki.com$/.test(email)) {
      event.target.setAttribute("class", "alert-red");
      emailAlert.hidden = false;
    } else {
      event.target.setAttribute("class", "alert-green");
      emailAlert.hidden = true;
    }
  });

  form.dept.addEventListener("input", event => {
    const dept = event.target.value.trim();
    event.target.value = dept;
    if (!dept) {
      event.target.setAttribute("class", "alert-red");
      deptAlert.hidden = false;
    } else {
      event.target.setAttribute("class", "alert-green");
      deptAlert.hidden = true;
    }
  });

  form.body.addEventListener("input", event => {
    const body = event.target.value.trim();
    if (!body) {
      event.target.setAttribute("class", "alert-red");
      bodyAlert.hidden = false;
    } else {
      event.target.setAttribute("class", "alert-green");
      bodyAlert.hidden = true;
    }
  });
})();
