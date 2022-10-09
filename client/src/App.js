import MonacoEditor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import defaultCode from './DefaultCode';
import makeRequest from './RunCode';
import NavBar from './Components/Navbar';
import { Col, Row } from 'react-bootstrap';
import Output from './Components/Output';

function App() {

  const [code, setCode] = useState('');
  const [lang, setLang] = useState('js');
  const [language, setLanguage] = useState('javascript')
  const [output, setOutput] = useState('');
  const [err, setErr] = useState('');
  const handleCLick = async () => {

    await makeRequest(code, lang)
      .then((res) => {
        if (res.status == 200) {
          setErr(res.data.err);
          setOutput(res.data.output);
        } else {
          setErr("Something went wrong !! Try again")
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  useEffect(() => {
    setCode(defaultCode.js);
  }, [])

  useEffect(() => {
    if (lang == 'py') {
      setCode(defaultCode.python)
      setLanguage('python');
    } else if (lang == 'js') {
      setCode(defaultCode.js)
      setLanguage('javascript');
    } else {
      setCode(defaultCode.cpp);
      setLanguage('cpp');
    }
  }, [lang]);

  const sty = {
    "height": "100vh"
  }

  return (
    <div className="App">
      <NavBar setLang={setLang} runCode={handleCLick} />
      <Row>
        <Col md={8}>
          <MonacoEditor
            theme='vs-dark'
            height="100vh"
            value={code}
            language={language}
            onChange={(e) => setCode(e)}
            defaultValue="// some comment"
          />
        </Col>
        <Col md={4} style={sty}>
          <Output output={output} error={err} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
