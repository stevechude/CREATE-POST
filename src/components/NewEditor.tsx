import React, { useState, useRef, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import {
  BsTypeBold,
  BsTypeItalic,
  BsListOl,
  BsListUl,
  BsBlockquoteLeft,
  BsLink45Deg,
  BsTextCenter,
  BsTextLeft,
  BsTextRight,
  BsImageFill,
} from "react-icons/bs";
import Dropdown from "./Dropdown";

const NewEditor: React.FC = () => {
  const [text, setText] = useState("");
  const [formattingState, setFormattingState] = useState({
    bold: false,
    italic: false,
    left: false,
    right: false,
    center: false,
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

  return (
    <div>
      <div className="border bg-FAFAFA w-auto h-auto mx-2 md:w-[662px] md:h-[550px] md:mt-32 md:m-auto">
        {/* post title */}
        <div className="w-full mx-2 mt-3 md:mx-6 md:my-2">
          <input
            type="text"
            placeholder="Add your title..."
            className="w-80 md:w-[364px] h-10 pl-3 rounded-md placeholder:pl-3 placeholder:font-bold placeholder:text-black placeholder:text-lg bg-white text-lg font-bold"
          />
        </div>

        <div className="border bg-white rounded-md md:w-[464px] md:h-[40px] md:my-4 md:mx-6 flex">
          <div className="border-r flex gap-2 md:gap-4 md:px-3">
            <button>
              <BsLink45Deg size={25} onClick={toggleLinkInput} />
            </button>
            <button>
              <BsImageFill size={21} />
            </button>
          </div>

          <div className="border-r flex gap-2 md:gap-4 px-3">
            <button>
              <BsTextLeft
                size={25}
                onClick={justifyLeft}
                color={formattingState.left ? "red" : "black"}
              />
            </button>
            <button>
              <BsTextRight
                size={25}
                onClick={justifyRight}
                color={formattingState.right ? "red" : "black"}
              />
            </button>
            <button>
              <BsTextCenter
                size={25}
                onClick={justifyCenter}
                color={formattingState.center ? "red" : "black"}
              />
            </button>
          </div>

          <div className="border-r flex gap-2 md:gap-4 px-2 md:px-3">
            <button onClick={makeBold}>
              <BsTypeBold
                size={25}
                color={formattingState.bold ? "red" : "black"}
              />
            </button>
            <button onClick={makeItalic}>
              <BsTypeItalic
                size={25}
                color={formattingState.italic ? "red" : "black"}
              />
            </button>
          </div>

          <div className="flex gap-2 md:gap-4 px-2 md:px-4">
            <button>
              <BsListOl size={25} />
            </button>
            <button>
              <BsListUl size={25} />
            </button>
            <button>
              <BsBlockquoteLeft size={25} />
            </button>
          </div>
        </div>

        <ContentEditable
          innerRef={contentEditableRef}
          html={text}
          onChange={(e) => setText(e.target.value)}
          className={`content ${formattingState.left ? "text-left" : ""} ${
            formattingState.right ? "text-right" : ""
          } ${formattingState.center ? "text-center" : ""}`}
        />

        <div className="mx-6 my-2">
          <Dropdown text={text} setText={setText} />
        </div>
      </div>
      <button className="border bg-0A7227 text-white rounded-md px-2.5 py-1 text-sm ml-2 md:ml-[62.5rem] mt-1">
        Post
      </button>
    </div>
  );
};

export default NewEditor;
