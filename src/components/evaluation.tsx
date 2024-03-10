import React from 'react'
import styled from 'styled-components';
import { InputComponent } from '../components/input';
import ButtonComponent from './button';

export const Text = styled.p`
  color: rgb(83, 100, 113);
  width: 277px;
  font-size: 1rem;
`;

const EvaluationContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-basis: 40%;
  align-items: center;
  padding: 2rem;
  background-color: #000C4B;
  color: white;
  margin-left: 1rem;
  border-radius: 1rem;
`;

const EvalutionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin: 1rem;
  font-weight: bold;
`;

type PropType = {
  data: any; // replace 'any' with a more specific type if you can
}

export default function Evaluation({data}: PropType) {

  return (


    <EvaluationContainer>
      <h2>Evaluation</h2>
      <EvalutionWrapper >
        <Label>
          Accuracy:
          <InputComponent inputValue={data.accuracy}  />
        </Label>

        <Label>
          Training Method:
          <InputComponent inputValue={data.training_method}  />
        </Label>

        <Label>
          Training Time:
          <InputComponent inputValue={data.training_time}  />
        </Label>

        <Label>
          Threshold:
          <InputComponent inputValue={data.threshold}  />
        </Label>

        <Label>
          Hyperparameter:
          <InputComponent inputValue={data.hyperparameter}  />
        </Label>

        <ButtonComponent buttonLabel={"Download Machine Learning file"}></ButtonComponent>
      </EvalutionWrapper>
    </EvaluationContainer>
  )
}
