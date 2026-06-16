export function isUniversalEditorEmbed() {
    return window.self !== window.top;
}

export function notifyUniversalEditorResize() {
    if (!isUniversalEditorEmbed()) {
        return;
    }

    window.dispatchEvent(new Event('resize'));
    requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
    });
}
