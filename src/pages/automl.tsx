import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import styled from 'styled-components';
import ButtonComponent from '../components/button';
import { SelectorComponent } from '../components/selector';
import { classificationMethods, supervisedLearning, unsupervisedLearning } from '../data';
import { InputComponent } from '../components/input';
import { useNavigate } from "react-router-dom";
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
  background-color: #000C4B;
  color: white;
  border-radius: 1rem;
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


 const AutoML: React.FC = () => {
  const [classificationMethod, setClassificationMethod] = useState<string>('Supervised');
  const [learningType, setLearningType] = useState('regression');
  const [threshold, setThreshold] = useState<GLfloat>(0.5);
  const [hyperparameter, setHyperparameter] = useState<number>(0.07);

  const [onFileChange, setOnFileChange] = useState<File | null>(null);
  const [isSumitted, setIsSumitted] = useState(false);

  const [evaluationData, setEvaluationData] = useState<any>('');


  const handleChangeMethod = (e: React.ChangeEvent<HTMLSelectElement>) => setClassificationMethod(e.target.value);
  const handleChangeLearningType = (e : React.ChangeEvent<HTMLSelectElement>) => setLearningType(e.target.value);
  const handleChangeTheshold = (e : React.ChangeEvent<HTMLInputElement>) => setThreshold(parseFloat(e.target.value));
  const handleChangeHyperparameter = (e : React.ChangeEvent<HTMLInputElement>) => setHyperparameter(parseFloat(e.target.value));

  const navigate = useNavigate();


  const uploadFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setOnFileChange(file[0]);
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(`classificationMethod: ${classificationMethod}`);
    console.log(`learningType: ${learningType}`);
    console.log(`onFileChange: ${onFileChange}`);
    console.log(`threshold: ${threshold}`);
    console.log(`hyperparameter: ${hyperparameter}`);

    const formData = new FormData();
    if (onFileChange !== null) {
      formData.append('labels', onFileChange);
    }

    const url = 'http://localhost:8001/train_model';
    const queryParams = `?learning_class=${classificationMethod}&training_method=${learningType}&k=${Number(hyperparameter)}}`;

    try {
      const response = await fetch(url + queryParams, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
        mode: 'cors',
      });

      console.log("response", response.body)

      if (response.ok) {
        console.log('API request completed successfully');
        setIsSumitted(true);

        const responseData = await response.json();
        console.log('Response body:', responseData);
        setEvaluationData(responseData);
        // navigate("/evaluation");

      } else {
        console.log('API request failed');
      }
    } catch (error) {
      console.log('An error occurred:', error);
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


    <FormContainer>
      <h2>Auto ML</h2>
      <Form onSubmit={handleSubmit}>
        <Label>
          Classification Method:
          <SelectorComponent options={classificationMethods} handleChange={handleChangeMethod} />
        </Label>

        {classificationMethod === "Supervised" ?
          <Label>
            Supervised Method:
            <SelectorComponent options={supervisedLearning} handleChange={handleChangeLearningType} />
          </Label>
        :
        classificationMethod === "Unsupervised" ?
          <Label>
            Unsupervised Method:
            <SelectorComponent options={unsupervisedLearning} handleChange={handleChangeLearningType} />
          </Label>
        : '' }

        <Label>
          Threshold:
          <InputComponent inputValue={threshold} handleChange={handleChangeTheshold}  />
        </Label>

        <Label>
          Hyperparameter:
          <InputComponent inputValue={hyperparameter} handleChange={handleChangeHyperparameter}  />
        </Label>

        <Label>
            Please upload your CSV file, where the first column is designated as the target variable,
            and the remaining columns are considered independent variables.
            If you need to upload audio or JPEG images, please specify the file path in the cells.
            <input
              id="file-input"
              type="file"
              accept=".csv"
              onChange={uploadFileHandler}
            />
        </Label>
        <ButtonComponent buttonLabel={isSumitted ? "Submitted" : "Send Data"}></ButtonComponent>
      </Form>
    </FormContainer>

    <ContentContainer>
      <Evaluation data={evaluationData}  />
    </ContentContainer>
  </MainContainer>
  )
 }

export default AutoML;