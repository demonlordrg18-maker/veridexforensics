async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function extractVisibleText(tabId) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      const text = document.body?.innerText || "";
      return text.slice(0, 12000);
    },
  });
  return result || "";
}

chrome.action.onClicked.addListener(async () => {
  const tab = await getActiveTab();
  if (!tab?.id) return;

  const content = await extractVisibleText(tab.id);
  if (!content.trim()) return;

  try {
    const resp = await fetch("http://localhost:8000/audit/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, include_metadata: true }),
    });
    const data = await resp.json();
    const summary = `Verity: ${Math.round((data.verity_index || 0) * 100)}% | Origin: ${(data.origin || "unknown").toUpperCase()}`;
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (msg) => alert(msg),
      args: [summary],
    });
  } catch (e) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (msg) => alert(msg),
      args: ["Veridex audit failed: " + String(e)],
    });
  }
});

