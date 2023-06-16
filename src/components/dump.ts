// const applyLink = () => {
//   const selectedText = window.getSelection()?.toString();
//   if (selectedText) {
//     const linkHtml = `<a href="${formattingState.linkUrl}">${selectedText}</a>`;

//     const selection = window.getSelection();
//     const range = selection?.getRangeAt(0);
//     const preSelectionRange = range?.cloneRange();
//     preSelectionRange?.selectNodeContents(contentEditableRef.current!);
//     preSelectionRange?.setEnd(range!.startContainer, range!.startOffset);
//     const start = preSelectionRange?.toString().length;

//     const modifiedText =
//       text.substring(0, start) +
//       linkHtml +
//       text.substring(start! + selectedText.length);

//     setText(modifiedText);
//   }

//   setFormattingState((prevState) => ({
//     ...prevState,
//     linkUrl: "",
//     showLinkInput: false,
//   }));
// };

// linkUrl: "",

// {
//   formattingState.showLinkInput && (
//     <div className="md:mx-6 pb-2">
//       <input
//         type="text"
//         placeholder="Enter link URL"
//         value={formattingState.linkUrl}
//         onChange={(e) =>
//           setFormattingState((prevState) => ({
//             ...prevState,
//             linkUrl: e.target.value,
//           }))
//         }
//         className="border bg-white rounded-l-md placeholder:pl-2 placeholder:text-sm"
//       />
//       <button
//         onClick={applyLink}
//         className="border rounded-r-md px-2 bg-0A7227 text-white"
//       >
//         Add
//       </button>
//     </div>
//   );
// }

// const handleTextChange = (event: React.ChangeEvent<HTMLDivElement>) => {
//   const value = event.target.innerHTML;
//   const wordCount = value.trim().split(/\s+/).length;
//   if (wordCount <= 1000) {
//     setText(value);
//   }
//   console.log(wordCount);
//   console.log(value);
// };

// how do i add a paragraph button amongst the toolbar icons at the top and make the texts in the ContentEditable components give a paragraph for when the paragraph button is clicked?
