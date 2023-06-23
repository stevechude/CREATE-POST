import { createContext, useContext, useEffect, useRef, useState } from "react";

export const PostContext = createContext<any>(null);

export const usePostContext = () => useContext(PostContext);

export const PostContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [text, setText] = useState("");
  const [formattingState, setFormattingState] = useState({
    bold: false,
    italic: false,
    left: false,
    right: false,
    center: false,
    linkUrl: "",
    showLinkInput: false,
  });

  const makeBold = () => {
    // Wrap the selected text in bold tags
    const modifiedText = formattingState.bold
      ? text.replace(/<\/?strong>/g, "")
      : `<strong>${text}</strong>`;
    setText(modifiedText);
    setFormattingState((prevState) => ({
      ...prevState,
      bold: !prevState.bold,
    }));
  };

  const makeItalic = () => {
    const modifiedText = formattingState.italic
      ? text.replace(/<\/?em>/g, "")
      : `<em>${text}</em>`;
    setText(modifiedText);
    setFormattingState((prevState) => ({
      ...prevState,
      italic: !prevState.italic,
    }));
  };

  const justifyLeft = () => {
    setFormattingState((prevState) => ({
      ...prevState,
      left: !prevState.left,
    }));
  };

  const justifyRight = () => {
    setFormattingState((prevState) => ({
      ...prevState,
      right: !prevState.right,
    }));
  };

  const justifyCenter = () => {
    setFormattingState((prevState) => ({
      ...prevState,
      center: !prevState.center,
    }));
  };

  const toggleLinkInput = () => {
    setFormattingState((prevState) => ({
      ...prevState,
      showLinkInput: !prevState.showLinkInput,
    }));
  };

  const contentEditableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.focus();
    }
  }, []);

  const applyLink = () => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      const linkHtml = `<a href="${formattingState.linkUrl}">${selectedText}</a>`;

      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const preSelectionRange = range?.cloneRange();
      preSelectionRange?.selectNodeContents(contentEditableRef.current!);
      preSelectionRange?.setEnd(range!.startContainer, range!.startOffset);
      const start = preSelectionRange?.toString().length;

      const modifiedText =
        text.substring(0, start) +
        linkHtml +
        text.substring(start! + selectedText.length);

      setText(modifiedText);
    }

    setFormattingState((prevState) => ({
      ...prevState,
      linkUrl: "",
      showLinkInput: false,
    }));
  };

  const contextValue = {
    text,
    setText,
    formattingState,
    setFormattingState,
    makeBold,
    makeItalic,
    justifyLeft,
    justifyCenter,
    justifyRight,
    toggleLinkInput,
    applyLink,
  };

  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
};
