import {
  GreyDescription,
  ItalicRedHeading,
  PreviewHeading,
  PrevieWhiteHeading,
} from "../Global/GlobalText";
import "./EventLivePreview.scss";
import React from "react";
import star from "../../Assets/start.png";
import previewlogo from "../../Assets/previewlogo.png";
import adminimg from "../../Assets/adminimg.jpg";
import { CreateButton } from "../Global/GlobalButton";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export const EventLivePreview = () => {
  return (
    <>
      <div className="event_preview_main">
        <div className="event_preview_top">
          <img src={previewlogo} alt="event_preview" />
          <PrevieWhiteHeading>
            RetailME Awards KSA 2023 - Celebrating Retail Excellence
          </PrevieWhiteHeading>
          <div className="admin_div">
            <img src={adminimg} alt="admin_login" />
            <span>Kathryn Murphy</span>
            <MdOutlineKeyboardArrowDown />
          </div>
        </div>
        <div className="event_preview_bg"></div>
        <div className="event_preview_submit_div">
          <div className="event_preview_star_div">
            <div className="event_preview_sub">
              <img src={star} alt="star" />
              <GreyDescription style={{ fontWeight: "600" }}>
                Entries Deadline
              </GreyDescription>
            </div>
            <div className="event_preview_sub">
              <img src={star} alt="star" />
              <GreyDescription style={{ fontWeight: "600" }}>
                Entries Deadline
              </GreyDescription>
            </div>
          </div>
          <CreateButton>Submit An Entry</CreateButton>
        </div>
        <div className="event_preview_cont">
          <div className="event_prev_italic">
            <ItalicRedHeading>RetailME AWARDS KSA 2023</ItalicRedHeading>
            <ItalicRedHeading>
              18th DECEMBER 2023 AT FAIRMONT RIYADH 
            </ItalicRedHeading>
            <ItalicRedHeading>
              (Assessment Period September 2022 - October 2023)
            </ItalicRedHeading>
            <ItalicRedHeading>
              Entry Closes: 5th December, 2023
            </ItalicRedHeading>
          </div>
          <div className="event_prev_submit_cont">
            <GreyDescription>
              You may start filling up the form from RHS GREEN Button "Submit an
              Entry".
            </GreyDescription>
            <GreyDescription>
              If you have any enquiries please feel free to contact:
            </GreyDescription>
          </div>

          <GreyDescription>
            The RetailME Awards KSA will honour top-performing retailers in
            Saudi Arabia, rewarding excellence across several retail categories
            – including fashion, food, grocery, leisure & entertainment, online
            retail, and store design, among others. In addition to the
            significant consumption verticals within retail, the RetailME Awards
            KSA places a lot of emphasis on the home-grown concepts in the
            Kingdom as well.{" "}
          </GreyDescription>
          <GreyDescription>
            Success stories of expansion, renovation, new launches, concepts,
            innovation in design, services, marketing & promotions, tech
            implementation, customer service, CSR initiatives, excellence across
            retail operations and any other USPs.
          </GreyDescription>

          <div className="question_cont">
            <PreviewHeading>Who is on the jury?</PreviewHeading>
            <GreyDescription>
              Eminent business leaders from varied walks like Retail,
              Technology, Shopping Centres and Government bodies whose votes
              matter the most to the MENA and KSA Retail Industry are on the
              Jury list to judge the nominations for RetailME Awards KSA 2023.{" "}
            </GreyDescription>
          </div>

          <div className="question_cont">
            <PreviewHeading>Process & Schedule</PreviewHeading>
            <GreyDescription>
              1. RetailME Awards KSA nomination forms can be filled out online
              on the Saudi Retail Forum website.
            </GreyDescription>
            <GreyDescription>
              2. Assessment Period: November 2022 – October 2023
            </GreyDescription>
            <GreyDescription>
              3. For the Launch category Assessment period is – January 2022 -
              August 2023
            </GreyDescription>
            <GreyDescription>
              4. Upon submitting the online questionnaire, you will be directed
              to the payment gateway. Prospective nominees are required to
              register nominations with the required fee, latest by 5th December
              2023.
            </GreyDescription>
            <GreyDescription>
              5. The RetailME Awards KSA Jury and the organizers have the right
              to decide on the final categories to be awarded, renaming the
              titles and moving nominations to the most appropriate categories –
              wherever required.
            </GreyDescription>
            <GreyDescription>
              6. Categories failing to receive less than three valid entries may
              be considered for excellence awards Special Mention/Recognition by
              the juror/jury chairman.
            </GreyDescription>
            <GreyDescription>7. Jurors are subject to change.</GreyDescription>
            <GreyDescription>
              8. Awardees will be announced at the glittering RetailME Awards
              KSA ceremony on 18th December 2023 at Fairmont Riyadh.
            </GreyDescription>
            <GreyDescription>
              9. For the presentation, please stick to a maximum of 10 slides.
            </GreyDescription>
            <GreyDescription>
              10. The following file type(s) are allowed Document File: pdf,
              ppt.
            </GreyDescription>
            <GreyDescription>
              11. File size must be smaller than 5MB
            </GreyDescription>
            <GreyDescription>
              12. To ensure a smooth assessment of your nominations by our Jury,
              ensure that your submissions and presentations are only in
              English.
            </GreyDescription>
          </div>

          <div className="red_question_cont">
            <PreviewHeading>Processing fee per entry</PreviewHeading>
            <PreviewHeading>$820 for each nomination.</PreviewHeading>
          </div>

          <div className="red_question_cont">
            <PreviewHeading>Payment Details</PreviewHeading>
            <GreyDescription style={{ fontWeight: "500" }}>
              Account Name - Images Multimedia FZ LLC
            </GreyDescription>
            <GreyDescription style={{ fontWeight: "500" }}>
              Bank - RAKBANK Account No - 0292886860001
            </GreyDescription>
            <GreyDescription style={{ fontWeight: "500" }}>
              Swift Code - NRAKAEAK
            </GreyDescription>
            <GreyDescription style={{ fontWeight: "500" }}>
              Branch - IBN Batuta,
            </GreyDescription>
            <GreyDescription style={{ fontWeight: "500" }}>
              Dubai IBAN Number - AE440400000292886860001
            </GreyDescription>
          </div>

          <div className="question_cont">
            <PreviewHeading>TERMS & CONDITIONS:</PreviewHeading>
            <GreyDescription>
              1. Award categories and titles are subject to change without
              notice.
            </GreyDescription>
            <GreyDescription>
              2. Submitting an entry form does not guarantee nomination.
              Nominees will be shortlisted on the basis of Performance data as
              supplied in the entry form.
            </GreyDescription>
            <GreyDescription>
              3. The final evaluation will be done by the RetailME Awards KSA
              grand jury, which comprises of industry experts, analysts and
              observers.
            </GreyDescription>
            <GreyDescription>
              4. The Jurors evaluate only the information contained in the entry
              form and not on any other information/ perception/ judgment and
              give their verdict to the Chairman of the jury who takes the final
              decision on the number of awardees (winners/ runners etc.) in each
              of the categories. Hence please fill in the form carefully.
            </GreyDescription>
            <GreyDescription>
              5. Any attempt to canvass for selection could lead to
              disqualification. Nominees must not contact Jury members or
              organizers in this regard.
            </GreyDescription>
            <GreyDescription>
              6. All nominees specifically agree that by participating in these
              awards, they are confirming that they will use:
            </GreyDescription>
            <GreyDescription style={{ fontStyle: "italic" }}>
              A: The authorized and complete description of the award as
              mentioned on the first page in any public communication related to
              these awards.
            </GreyDescription>
            <GreyDescription style={{ fontStyle: "italic" }}>
              B: Specific template of RetailME Awards KSA logo, ribbon & trophy
              provided by the IMAGES Group.
            </GreyDescription>
            <GreyDescription>
              7. Entries with factually incorrect or misleading information may
              be deemed invalid.
            </GreyDescription>
            <GreyDescription>
              8. All nominees specifically confirm that the information they
              submit is accurate and true and that it may be used for internal
              research & Industry insights unless otherwise specified.
            </GreyDescription>
            <GreyDescription>
              9. Every entry form must be attested by a person at the level of
              Director / CEO / Proprietor
            </GreyDescription>
            <GreyDescription>
              10. Jury and the organizers have the right to decide on the final
              categories to be awarded, renaming the titles, clubbing the
              categories and moving nominations to a category other than the
              category originally filed in – wherever required.
            </GreyDescription>
            <GreyDescription>
              11. Minimum 3 valid nominations are required per category; else
              the category may be dropped without notice. However, nominations
              received in such categories may be considered for Excellence/
              Special Jury Awards, if not moved to other closest category.
            </GreyDescription>
            <GreyDescription>
              12. The processing fee will be non-refundable
            </GreyDescription>
          </div>
        </div>
      </div>
    </>
  );
};
