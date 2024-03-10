import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import styled from 'styled-components';
import ButtonComponent from '../components/button';
import { SelectorComponent } from '../components/selector';
import { classificationMethods, supervisedLearning, unsupervisedLearning } from '../data';
import { InputComponent } from '../components/input';
import logo from '../assets/logo.jpg';
import rightLogo from '../assets/right_logo.png';
import Evaluation from '../components/evaluation';

const MainContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-basis: 40%;
  align-items: center;
  padding: 2rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin: 1rem;
  font-weight: bold;
`;


 const EvaluationComponent: React.FC = () => {
  const [classificationMethod, setClassificationMethod] = useState<string>('Supervised');
  const [learningType, setLearningType] = useState('regression');
  const [threshold, setThreshold] = useState<GLfloat>(0.5);
  const [hyperparameter, setHyperparameter] = useState<number>(0.07);

  const [onFileChange, setOnFileChange] = useState<File | null>(null);
  const [isSumitted, setIsSumitted] = useState(false);


  const handleChangeMethod = (e: React.ChangeEvent<HTMLSelectElement>) => setClassificationMethod(e.target.value);
  const handleChangeLearningType = (e : React.ChangeEvent<HTMLSelectElement>) => setLearningType(e.target.value);
  const handleChangeTheshold = (e : React.ChangeEvent<HTMLInputElement>) => setThreshold(parseFloat(e.target.value));
  const handleChangeHyperparameter = (e : React.ChangeEvent<HTMLInputElement>) => setHyperparameter(parseFloat(e.target.value));

  const uploadFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setOnFileChange(file[0]);
    }
  }


  return (

  <MainContainer>

    <div style={{ flexBasis: '30%', display: 'flex'}}><img src={logo}></img></div>
    <div style={{display: "flex", justifyContent: "space-evenly", width: '30%', color: "#04346C", flexBasis: '33%'}}>
    </div>
    <div style={{ flexBasis: '33%', display: 'flex'}}>
      <ButtonComponent buttonLabel="Logout"></ButtonComponent>
      <ButtonComponent buttonLabel="Download App"></ButtonComponent>
    </div>


    <ContentContainer>
      <Evaluation />
    </ContentContainer>

    <ContentContainer>
      <img src={rightLogo}></img>
    </ContentContainer>
  </MainContainer>
  )
 }

export default EvaluationComponent;