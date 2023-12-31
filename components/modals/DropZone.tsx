import Image from "next/image";

import { Group, Text, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { useState } from "react";

export function Drop({ upImg, setImg }: any) {
  const theme = useMantineTheme();
  console.log(upImg);
  function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  const fileSizeInBytes = upImg?.size; // Replace with the actual file size
  const fileSizeFormatted = formatBytes(fileSizeInBytes);
  return (
    <Dropzone
      onDrop={(files) => {
        setImg(files[0]);
      }}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: rem(220), pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        {/* <Dropzone.Idle>
          <IconPhoto size="3.2rem" stroke={1.5} />
        </Dropzone.Idle> */}
        {upImg ? (
          <div className="flex flex-col justify-center  items-center">
            <Image
              src={URL.createObjectURL(upImg)}
              alt={""}
              width={200}
              height={200}
              className="rounded-[12px]"
            />

            <div className="flex justify-between items-center gap-[10px] ">
              <span className="text-[#54565B] text-[14px]">
                {(upImg as File)?.name}
              </span>
              <span className="text-[#B4B4B0] text-[10px] font-normal flex items-center">
                {fileSizeFormatted}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-[20px]">
            <div className="flex flex-col gap-[10px] justify-center items-center">
              <Image
                src={"/images/cloud.png"}
                alt={""}
                width={50}
                height={50}
              />
              <p className="text-[#B4B4B0] text-[12px]">
                image, smaller than 10MB
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-[10px]">
              <div className="text-[#656C6C] text-[15px]">
                Drag and drop your file here or
              </div>
              <button className="bg-[#CB38381A] py-[5px] px-[13px] rounded-[5px] text-[#C81107] text-[12px]">
                Choose File
              </button>
            </div>
          </div>
        )}
      </Group>
    </Dropzone>
  );
}
