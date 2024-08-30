"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { InputRequest } from "../../../interface/request";
import api from "@/api/api";

export default function Home() {
  const [InputValue, setInputValue] = useState<string>("");
  const [inputs, setInputs] = useState<InputRequest[]>([]);
  const [renew, setRenew] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      const response = await api.GetTodosList();

      setInputs(response);
    };

    fetch();

    return () => {
      setRenew(false);
    };
  }, [renew]);

  const headleButton = async () => {
    try {
      const response = await api.TodosCreateList(InputValue);
      setRenew(true);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const headleInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const headleCheck = async (id: string, title: string) => {
    try {
      const response = await api.TodosEditList(id, title);
      console.log(response);
      setRenew(true);
    } catch (err) {
      console.log(err);
    }
  };

  const headleEditInput = (e: any, value: number) => {
    setInputs((prevInputs) =>
      prevInputs.map((item, index) => {
        return index === value ? { ...item, title: e.target.value } : item;
      })
    );
  };

  const headleDelete = async (value: string) => {
    try {
      const response = await api.TodosDeleteList(value);
      console.log(response);
      setRenew(true);
    } catch (e) {
      console.log(e);
    }
  };

  const headleEdit = (value: number) => {
    setInputs((prevInputs) =>
      prevInputs.map((item, index) => {
        return index === value ? { ...item, edit: !item.edit } : item;
      })
    );
  };

  return (
    <div className="h-screen w-full bg-slate-300">
      <div className="flex items-center justify-center py-5 pt-[15%]">
        <input
          onChange={headleInput}
          value={InputValue}
          className="h-10 w-96 rounded-lg indent-2"
        />

        <button
          className="ml-5 h-10 w-20 rounded-lg bg-green-300"
          onClick={headleButton}
        >
          送出
        </button>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex flex-col">
          {inputs.map((input, index) => (
            <div key={index} className="flex items-center">
              <input
                className="my-2 h-10 w-96 rounded-lg indent-2"
                key={index}
                type="text"
                value={input.title}
                disabled={input.edit ? false : true}
                onChange={(e) => headleEditInput(e, index)}
              />
              <div className="ml-5 h-10 w-20 rounded-lg">
                <div className="flex w-40">
                  <button
                    className="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-400"
                    onClick={() => headleDelete(input._id)}
                  >
                    <Image
                      src="/close.png"
                      width={20}
                      height={20}
                      alt="Picture of the author"
                    />
                  </button>

                  <button
                    className="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-400"
                    onClick={() => headleEdit(index)}
                  >
                    <Image
                      src="/edit.png"
                      width={20}
                      height={20}
                      alt="Picture of the author"
                    />
                  </button>

                  <button
                    className="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-400"
                    onClick={() => headleCheck(input._id, input.title)}
                  >
                    <Image
                      src="/check.png"
                      width={20}
                      height={20}
                      alt="Picture of the author"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
