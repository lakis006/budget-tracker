
let db
const request = window.indexedDB.open("budget", 1);



request.onupgradeneeded = function (e) {
  const db = event.target.result;
  let storedObject = db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};


request.onerror = function (event) {
  console.log("Looks like there was an error", event.target.errorCode);
};

function saveRecord(record) {
  const transaction = db.transaction(["pending"], "readwrite");
  const pendingStore = transaction.storedObject("pending");

  pendingStore.add(record); //adding a record 
}

function checkDatabase() {
  const transaction = db.transaction(["pending"], "readwrite");
  const pendingStore = transaction.storedObject("pending");
  const records = pendingStore.getAll();


  records.onsuccess = function () {
    if (records.result.length > 0) {
      fetch("/api/transition/bulk", {
        method: "POST",
        body: JSON.stringify(records.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(() => {
          const transaction = db.transaction(["pending"], "readwrite");
          const pendingStore = transaction.storedObject("pending");

          pendingStore.clear();
        });
    }
  }
}

window.addEventListener("online", checkDatabase); //app listener 