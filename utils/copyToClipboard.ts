export default function copyToClipboard(text: string) {
    let textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
        return document.execCommand("copy"); // Security exception may be thrown by some browsers.
    }
    catch (ex) {
        return false;
    }
    finally {
        document.body.removeChild(textarea);
    }
}