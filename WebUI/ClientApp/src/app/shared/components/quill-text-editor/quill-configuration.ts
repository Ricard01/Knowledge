var toolbarOptions = [
    ["bold", "italic", "underline"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ["link"],
    ["clean"] // remove formatting button

]

export const QuillConfiguration = {
    syntax: true,
    toolbar: toolbarOptions,

    // keyboard: { bindings: { tab: false } }  // doesnt allow tab on textarea
};

export const QuillPreview = {
    syntax: true,
    toolbar: false,
    // keyboard: { bindings: { tab: false } }  // doesnt allow tab on textarea
};


