import React, { FormEvent, useState } from 'react';
import './styles.scss';

const SignUp = () => {
  const [name, setName] = useState<string>();
  const [file, setFile] = useState<FileList>();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="signup-page">
      <h1>Signup</h1>
      <form onSubmit={submit}>
        <div className="signup-page__name">
          <label>Name</label>
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="signup-page__file">
          <label>File</label>
          <input type="file" onChange={e => setFile(e.target.files)} />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
