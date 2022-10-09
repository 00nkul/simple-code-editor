import React, { useEffect, useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap';
export default function Output({ output, error }) {
    const [tColor, setTColor] = useState('primary');
    const [text, setText] = useState('');
    useEffect(() => {
        if (error != '') {
            setTColor('danger');
            setText(error);
        } else {
            setTColor('white');
            setText(output);
        }
    }, [output, error]);

    return (
        <div className='border mt-2 h-100'>
            Output
            <div className={`text-left  h-100`}>
                <div className='h-100'>
                    <Form.Control
                        as="textarea"
                        placeholder="Output will display here"
                        className={`text-${tColor} h-100 bg-dark`}
                        disabled
                        value={text}
                    />
                </div>
            </div>
        </div>
    )
}