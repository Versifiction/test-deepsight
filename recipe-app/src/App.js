import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [topIngredients, setTopIngredients] = useState();
  const [results, setResults] = useState();

  // Every time results changes, we changes the top 5 ingredients
  useEffect(() => {
    const countReducer = (countWord, word) => {
      if (countWord.has(word)) {
        countWord.set(word, countWord.get(word) + 1);
      } else {
        countWord.set(word, 1);
      }
      return countWord;
    };

    if (results) {
      setTopIngredients(
        [
          ...results
            .flatMap((item) => item.ingredients.split(", "))
            .reduce(countReducer, new Map())
            .entries(),
        ]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([word, count]) => `${word} (${count})`)
          .join(", ")
      );
    }
  }, [results, topIngredients]);

  // Triggered when the input value changes
  function handleChange(e) {
    setInputValue(e.target.value);
  }

  // Triggered when the user checks or unchecks a checkbox
  function toggleIngredient(e) {
    if (!ingredients.includes(e.target.name)) {
      setIngredients([...ingredients, e.target.name]);
    } else {
      setIngredients(ingredients.filter((i) => i !== e.target.name));
    }
  }

  // Triggered when the user clicks on the "search" button
  function search() {
    console.log("search ", search);
    const ingredientsList = ingredients.join(",");
    const url = `http://localhost:8888/api?i=${ingredientsList}&q=${inputValue}&p=1`;
    axios
      .get(url)
      .then((res) => {
        console.log("res ", res);
        setResults(res.data.results);
      })
      .catch((err) => {
        console.log("err ", err);
      });
  }

  return (
    <div className="App">
      <h1>Recipes</h1>
      <p>Your ingredients :</p>
      <div>
        <input
          type="checkbox"
          id="tomato"
          name="tomato"
          onClick={toggleIngredient}
        />
        <label htmlFor="tomato">Tomato</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="onions"
          name="onions"
          onClick={toggleIngredient}
        />
        <label htmlFor="onions">Onions</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="garlic"
          name="garlic"
          onClick={toggleIngredient}
        />
        <label htmlFor="garlic">Garlic</label>
      </div>
      <div id="input-container">
        <p>You want a :&nbsp;</p>
        <input type="text" value={inputValue} onChange={handleChange} />
      </div>
      <div id="button-container">
        <button onClick={search} style={{ display: "block", margin: "0 auto" }}>
          Search
        </button>
      </div>
      {results && (
        <div id="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Picture</th>
                <th>Ingredients</th>
              </tr>
            </thead>
            <tbody>
              {results &&
                results.slice(0, 10).map((r) => (
                  <tr
                    onClick={() => window.open(r.href, "_blank")}
                    key={r.title}
                  >
                    <td>{r.title}</td>
                    <td>
                      {r.thumbnail ? (
                        <img src={r.thumbnail} alt={r.title} />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{r.ingredients}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p>
            <span style={{ fontWeight: "bold" }}>Top 5 ingredients : </span>
            {topIngredients}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
