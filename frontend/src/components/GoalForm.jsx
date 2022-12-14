import React from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { IoChevronBackOutline } from "react-icons/io5";
import { createGoal } from "../auth/goalService";
import { toast } from "react-toastify";

function GoalForm(props) {
  /**
   * This function is called when the user submits a goal. It sends the goal text to the backend, and if
   * the goal is successfully added, it calls the renderUserGoals function to update the user's goals
   */
  async function handleGoalSubmit(e) {
    e.preventDefault();
    props.setGoalText("");
    //Get user token
    const token = JSON.parse(localStorage.getItem("user")).token;

    const goalData = {
      text: props.goalText,
    };

    const message = await createGoal(goalData, token);

    if (message.status === 400) {
      toast.error(message.data.message);
    } else if (message.status === 200) {
      toast.success("Added Successfully");
      props.renderUserGoals();
    } else {
      toast.error(message.statusText);
    }
  }

  return (
    <Box>
      <FormControl>
        <FormLabel fontSize={"1.2rem"}>اكتب هدفك🎯 </FormLabel>
        <Input
          type={"text"}
          bgColor={"white"}
          placeholder="ادخل الهدف"
          onChange={(e) => {
            props.change(e.target.value);
          }}
          value={props.goalText}
        />
        <Button
          type="submit"
          onClick={(e) => {
            handleGoalSubmit(e);
          }}
          bg={"black"}
          colorScheme={""}
          color={"white"}
          variant="solid"
          width={"100%"}
          mt={"3"}
          alignItems={"center"}
        >
          سجل هدفك
          <IoChevronBackOutline />
        </Button>
      </FormControl>
    </Box>
  );
}

export default GoalForm;
