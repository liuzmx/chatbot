import { useState, useEffect } from "react";

import { useRequest } from "ahooks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Button from "@mui/material/Button";

import ChatGPTLogo from "@/assets/chatgpt.png";

import styles from "./index.less";
import { SendChat } from "./service";

let chatDataList = [];

export default function Chatbot() {
  const [question, setQuestion] = useState();

  function SaveQuestion(event) {
    setQuestion(event.target.value);
  }

  const [chatData, setChatData] = useState();
  function ChatDataElement(chatDataList) {
    const questionAnswerItems = chatDataList.map((item, index) =>
      item.type == "question" ? (
        <Stack
          key={index}
          spacing={2}
          direction="row"
          alignItems="center"
          margin="25px 25%"
        >
          <Avatar sx={{ bgcolor: deepOrange[400], width: 30, height: 30 }}>
            U
          </Avatar>
          <Typography sx={{ color: "#202123" }}>{item.value}</Typography>
        </Stack>
      ) : (
        <Box key={index} padding="1px 0" sx={{ backgroundColor: "#F7F7F8" }}>
          <Stack spacing={2} direction="row" margin="25px 25%">
            <Avatar src={ChatGPTLogo} sx={{ width: 30, height: 30 }} />
            <Typography sx={{ color: "#353740" }}>{item.value}</Typography>
          </Stack>
        </Box>
      )
    );

    setChatData(questionAnswerItems);
  }

  const { run: getAnswer } = useRequest((text) => SendChat(text), {
    manual: true,
    onSuccess: (result) => {
      const answerItem = {
        type: "answer",
        value: result.body.res,
      };
      chatDataList.push(answerItem);
      ChatDataElement(chatDataList);
    },
  });

  function SendQuestion() {
    const questionItem = { type: "question", value: question };
    chatDataList.push(questionItem);
    getAnswer(question);
    ChatDataElement(chatDataList);
  }

  return (
    <div className={styles.chatbot}>
      <Stack spacing={1} direction="row" alignItems="center" margin="10px 30px">
        <SmartToyIcon sx={{ color: deepOrange[400], width: 30, height: 30 }} />
        <Typography variant="h6" margin="10px 30px">
          iBot
        </Typography>
      </Stack>
      <Box
        sx={{
          height: 550,
          maxHeight: 550,
          overflow: "auto",
        }}
      >
        {chatData}
      </Box>
      <div className={styles.textInput}>
        <OutlinedInput
          placeholder="Send a message..."
          fullWidth={true}
          onChange={SaveQuestion}
          endAdornment={
            <Button variant="text" onClick={SendQuestion}>
              <SendOutlinedIcon color="action" />
            </Button>
          }
        />
      </div>
    </div>
  );
}
