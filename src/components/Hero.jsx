import React from "react";
import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-4">
        <img src={logo} alt="logo" className="w-32 object-contain" />
        <button
          type="button"
          className="black_btn"
          onClick={() => window.open("https://github.com/samuelamissah")}
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Summerize Articles and Texts with <br className="max-md:hidden"/>
        <span className=" orange_gradient"> Kojo and OPEN AI GPT-3 </span>
        </h1>
        <h2 className="sub_text desc">
            Kojo is a tool that uses the power of GPT-3 to summarize articles and
            texts. It is built with  OpenAI API.
        </h2>
    </header>
  );
};

export default Hero;
