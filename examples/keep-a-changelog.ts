import { whisper } from '..';

(async () => {
  const response = await whisper({
    message: 'Make the message brief, in the style of "keep a changelog". Don\'t use the name of the package in the message. Don\'t mention version number or code that isn\'t committed.'
  });

  console.log(response);
  console.log('---');
  console.log(response.choices[0].message.content);
})();
