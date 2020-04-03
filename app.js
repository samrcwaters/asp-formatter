// Source: https://stackoverflow.com/questions/36639681/how-to-copy-text-from-a-div-to-clipboard/51261023
const copyToClipboard = () => {
  if (document.selection) {
    let range = document.body.createTextRange();
    range.moveToElementText(document.getElementById("formatted-text"));
    range.select().createTextRange();
    document.execCommand("copy");
  } else if (window.getSelection) {
    let selection = window.getSelection();
    let range = document.createRange();
    range.selectNode(document.getElementById("formatted-text"));
    selection.removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
  }
};

const format = () => {
  let text = document.getElementById("preformatted").value;
  text = `" ${text.replace(/(\n)+/g, ' "&_\n" ')} "`;
  document.getElementById("formatted").innerHTML = `<pre id="formatted-text">${text}</pre>`;
};

document.getElementById("preformatted").value = `INSERT INTO clients
(client_id, client_name, client_type)
SELECT 10345, 'IBM', 'advertising'
FROM dual
WHERE NOT EXISTS (SELECT *
                  FROM clients
                  WHERE clients.client_id = 10345);`;

document.getElementById("format-btn").addEventListener("click", format);

document.getElementById("copy-btn").addEventListener("click", copyToClipboard);
