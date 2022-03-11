import * as React from "react";
import { useState } from "react";
import { shimmer, toBase64 } from "../../Util";
import { Image } from "react-native";
import { useStore } from "../../Store";
import { PluginComponent, PluginInputType } from "react-with-native-form";

const ImageInput: PluginComponent<ImageInputType> = ({ onChange, value }) => {
  const [loading, setLoading] = useState(false);
  const [loginToken] = useStore("loginToken");
  const getImageAndUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      uploadFile(file);
    }
  };
  const uploadFile = async (file: File) => {
    const contentType = file.type; // eg. image/jpeg or image/svg+xml
    console.log("contentType", contentType, file.size);
    if (!loginToken) {
      return;
    }
    setLoading(true);

    const formData = new FormData();

    console.log("FILE", file);
    formData.append("file", file);
    formData.append("loginToken", loginToken);
    //TODO: Fix imageupload (wijnand)
    // postMultipart("uploadImage", formData)
    //   .then((response) => {
    //     setLoading(false);
    //     if (response?.success) {
    //       onChange({ url: response.url, base64: response.base64 });
    //     } else {
    //       console.log("RESPONSE", response);
    //     }
    //   })
    //   .catch((e) => console.log(e));
  };

  return (
    <div className={`flex flex-col border rounded-lg bg-white px-2 py-4`}>
      {value && value.url && value.base64 && (
        <div>
          <Image
            width={100}
            height={100}
            // className={`object-cover rounded`}
            // alt="Image upload"
            // placeholder="blur"
            // blurDataURL={
            //   value.base64 ||
            //   `data:image/svg+xml;base64,${toBase64(shimmer(100, 100))}`
            // }
            // src={value.url}
            source={{ uri: value.url }}
          />
        </div>
      )}
      <div className={`flex flex-row`}>
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          onChange={getImageAndUpload}
        />
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

ImageInput.defaultInitialValue = null;

export type ImageValue = {
  url: string;
  base64: string;
};

export class ImageInputType implements PluginInputType {
  /**
   * value type
   */
  value!: ImageValue | null;

  /**
   * input generic configuration
   */
  config?: {};
  /**
   * field specific configuration
   */
  extra?: {};
}

export default ImageInput;
