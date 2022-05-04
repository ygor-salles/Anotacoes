/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FlexColumn, FlexLine } from './styles';

interface IForm {
  username: string;
  age: number;
  car: string;
  stack: string;
  technologies: string[];
}

export function MyForm() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<IForm>({
    username: '',
    age: null,
    car: '',
    stack: '',
    technologies: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const { value } = event.target;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputs(values => ({ ...values, car: event.target.value }));
  };

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setInputs(values => ({
        ...values,
        technologies: [...values.technologies, event.target.value],
      }));
    } else {
      const techologiesAux = [...inputs.technologies];
      techologiesAux.splice(inputs.technologies.indexOf(event.target.value), 1);

      setInputs(values => ({
        technologies: [...techologiesAux],
        ...values,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(
      `username: ${inputs.username} \nage: ${inputs.age} \nCarro: ${inputs.car} \nStack: ${inputs.stack} \nTecnologias: ${inputs.technologies}`,
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* inputs texts */}
      <FlexColumn>
        <label>
          Enter your name:
          <input
            type="text"
            name="username"
            value={inputs.username || ''}
            onChange={handleChange}
            required
          />
        </label>
      </FlexColumn>

      <FlexColumn>
        <label>
          Enter your age:
          <input
            type="number"
            name="age"
            value={inputs.age || ''}
            onChange={handleChange}
            required
          />
        </label>
      </FlexColumn>

      {/* select */}
      <FlexColumn>
        <label>
          Selecione o carro
          <select value={inputs.car} onChange={handleChangeSelect} required>
            <option />
            <option value="Ford">Ford</option>
            <option value="Volvo">Volvo</option>
            <option value="Fiat">Fiat</option>
          </select>
        </label>
      </FlexColumn>

      {/* Inputs Radios */}
      <FlexColumn>
        <label>
          <strong>De qual lado da aplicação você desenvolve?</strong>
        </label>
        <label>
          <input
            type="radio"
            name="stack"
            value="frontend"
            onChange={handleChange}
          />
          Front-end
        </label>
        <label>
          <input
            type="radio"
            name="stack"
            value="backend"
            onChange={handleChange}
          />
          Back-end
        </label>
        <label>
          <input
            type="radio"
            name="stack"
            value="fullstack"
            onChange={handleChange}
          />
          Fullstack
        </label>
      </FlexColumn>

      {/* Inputs Checkbox */}
      <label>
        <strong>Selecione as tecnologias que utiliza:</strong>
      </label>
      <br />
      <br />
      <FlexLine>
        <div>
          <input
            type="checkbox"
            name="tecnologia3"
            value="JavaScript"
            onChange={handleChangeCheckBox}
          />
          <label> JavaScript</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="tecnologia4"
            value="PHP"
            onChange={handleChangeCheckBox}
          />
          <label> PHP</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="tecnologia5"
            value="C#"
            onChange={handleChangeCheckBox}
          />
          <label> C#</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="tecnologia6"
            value="Python"
            onChange={handleChangeCheckBox}
          />
          <label> Python</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="tecnologia7"
            value="Java"
            onChange={handleChangeCheckBox}
          />
          <label> Java</label>
        </div>
      </FlexLine>

      <FlexLine>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Voltar página
        </button>
        <input type="submit" />
      </FlexLine>
    </form>
  );
}
