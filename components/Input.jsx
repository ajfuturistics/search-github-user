"use client";

import React, { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Input = () => {
  const searchRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const username = searchParams.get("username") || "";

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchRef?.current?.value?.trim() === "") return;
    router.push(`?username=${searchRef.current.value}`);
  };

  useEffect(() => {
    if (searchRef?.current && username) {
      searchRef.current.value = username;
    }
  }, [username]);

  return (
    <form onSubmit={handleSearch} className="w-full flex items-center p-1">
      <input
        type="text"
        placeholder="Search Github User"
        className="w-full bg-gray-200 px-2 py-1 outline-none"
        ref={searchRef}
        required
      />
      <button className="bg-blue-400 px-2 py-1 text-white" type="submit">
        Search
      </button>
    </form>
  );
};

export default Input;
