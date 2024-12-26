import React from "react";
import "./AwardDirectory.scss";
import { Description } from "../../../../Global/GlobalText";
import {
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../../Global/GlobalButton";
import { useNavigate } from "react-router-dom";
import { InputLabel } from "../../../../Global/GlobalFormElement";
import { Switch } from "@mui/joy";

export const AwardDirectory = ({ setSelectedButton }) => {
  const [checked, setChecked] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <form className="newevent_form">
        <div className="submissionid_format">
          <Description>
            Award Directory displays all the awards hosted on Judgify which are
            visible to public. Click here to view Award Directory page.
          </Description>
        </div>

        <div className="awarddirectory_visible">
          <div className="awarddirectory_visible_btn">
            <InputLabel>Backdoor Link</InputLabel>
            <span>
              {/* <Switch
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
              /> */}
              <Switch
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                color={checked ? "success" : "neutral"}
                variant={checked ? "solid" : "outlined"}
                endDecorator={checked ? "On" : "Off"}
                slotProps={{
                  endDecorator: {
                    sx: {
                      minWidth: 24,
                    },
                  },
                }}
              />
              {/* <Description>No</Description> */}
            </span>
          </div>

          <Description style={{ fontStyle: "italic" }}>
            Setting 'Public' as 'Yes' means your event will be displayed on
            'Award Directory' page
          </Description>
        </div>

        <div className="newevent_btndiv">
          <GreyBorderButton
            onClick={() => {
              navigate(setSelectedButton(4));
            }}
          >
            Cancel
          </GreyBorderButton>

          <RedBackgroundButton
            onClick={() => {
              navigate(setSelectedButton(1));
            }}
          >
            Save
          </RedBackgroundButton>
        </div>
      </form>
    </div>
  );
};
