import { InputLabel } from '@mui/material';
import * as React from 'react';
import { FC, useCallback, useMemo, useState } from 'react';

import { useDropzone } from 'react-dropzone';
import { usePapaParse } from 'react-papaparse';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
}as const;

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

type Props = {
  setCsvData: React.Dispatch<any>
};

export const RakutenCardCSVDropArea: FC<Props> = (props)  => {
  const {setCsvData} = props;
  const { readString } = usePapaParse();
  const [filename, setFileName] = useState<string>("");

  const onDrop = useCallback((acceptedFiles:File[]) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result as string;
        readString(binaryStr, {
          worker: true,
          complete: (results: any) => {
            setCsvData(results.data)
            setFileName(file.name)
          }
        })
      }
      reader.readAsText(file)
    });
  }, [])
  
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
  }); 
  
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <>
      <InputLabel required shrink={true} margin="dense" variant="standard">楽天カードCSV</InputLabel>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>RakutenCardの利用履歴CSVをドロップしてください</p>
        { filename ?  <p>{filename}</p> : <></>}
      </div>
    </>
  );
}