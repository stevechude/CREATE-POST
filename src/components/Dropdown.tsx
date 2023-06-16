import React, { useState } from "react";
import { BsPlusLg, BsImageFill } from "react-icons/bs";
import { TiVideo } from "react-icons/ti";
import { TbChartBubbleFilled } from "react-icons/tb";

const Dropdown: React.FC<{
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}> = ({ text, setText }) => {
  const [showLinks, setShowLinks] = useState(false);

  const handleEmbedClick = () => {
    setShowLinks(!showLinks);
  };

  const handleOptionClick = (option: string) => {
    if (option === "image") {
      // Create an input element of type "file"
      const input = document.createElement("input");
      input.type = "file";

      // Set the accept attribute to allow only image files
      input.accept = "image/*";

      // Add event listener for when a file is selected
      input.addEventListener("change", (event) => {
        const file = (event.target as HTMLInputElement)?.files?.[0];

        if (file) {
          // Read the selected file as a data URL
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target && e.target.result) {
              const imageSrc = e.target.result.toString();

              // Create an image tag with the source as the data URL
              const imageTag = `<img src="${imageSrc}" alt="User Image" class="w-[200px] h-[200px] rounded-md">`;

              // Append the image tag to the content
              const modifiedText = text + imageTag;
              setText(modifiedText);
            }
          };
          reader.readAsDataURL(file);
        }
      });

      // Trigger click event on the input element
      input.click();
    }
  };

  return (
    <div>
      <button
        onClick={handleEmbedClick}
        className="border bg-E7F1E9 rounded-full"
      >
        <BsPlusLg className="p-1.5 h-7 w-7" />
      </button>
      {showLinks && (
        <div className="border rounded-md shadow-xl w-[277px] bg-white">
          <p className="mx-2.5 py-3 text-xs text-333333">EMBEDS</p>
          <ul className="mx-2.5">
            <li
              onClick={() => handleOptionClick("image")}
              className="border-t py-2 flex gap-3 hover:bg-F7FCF8 cursor-pointer"
            >
              <BsImageFill className="my-auto" />
              <div className="flex-col">
                <p className="font-semibold">Picture</p>
                <p className="text-343E37 text-xs">Jpeg, png</p>
              </div>
            </li>
            <li
              onClick={() => handleOptionClick("video")}
              className="border-t py-2 flex gap-3 hover:bg-F7FCF8 cursor-pointer"
            >
              <TiVideo className="my-auto" />
              <div className="flex-col">
                <p className="font-semibold">Video</p>
                <p className="text-343E37 text-xs">Embed a YouTube video</p>
              </div>
            </li>
            <li
              onClick={() => handleOptionClick("social-media")}
              className="border-y py-2 flex gap-3 hover:bg-F7FCF8 cursor-pointer"
            >
              <TbChartBubbleFilled className="my-auto" />
              <div className="flex-col">
                <p className="font-semibold">Social</p>
                <p className="text-343E37 text-xs">Embed a Facebook link</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
