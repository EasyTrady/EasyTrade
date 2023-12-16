// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useSelector } from "react-redux";
import moment from "moment"
export default function data() {
  const totals=useSelector((state)=>state.totals.value)
  
  const avatars = (members) =>members?.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <SoftAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "offer_title", align: "center" },
      { name: "offer_end_date", align: "center" },
      
    ],

    rows: totals?.nearly_expired_offers?.map((ele)=>({offer_title:ele?.offer_title,offer_end_date:moment(ele?.offer_end_date).format("YYYY/MM/DD")}))
    // [
    //   {
    //     product: [logoXD, "Soft UI XD Version"],
    //     members: (
    //       <SoftBox display="flex" py={1}>
    //         {avatars(
    //           totals?.low_stock_products?.map((ele)=>([ele?.main_image,ele?.name]))
    //         )}
    //       </SoftBox>
    //     ),
    //     stock: (
    //       <SoftTypography variant="caption" color="text" fontWeight="medium">
    //         $14,000
    //       </SoftTypography>
    //     ),
    //     completion: (
    //       <SoftBox width="8rem" textAlign="left">
    //         <SoftProgress value={60} color="info" variant="gradient" label={false} />
    //       </SoftBox>
    //     ),
    //   },
    //   {
    //     product: [logoAtlassian, "Add Progress Track"],
    //     members: (
    //       <SoftBox display="flex" py={1}>
    //         {avatars([
    //           [team2, "Romina Hadid"],
    //           [team4, "Jessica Doe"],
    //         ])}
    //       </SoftBox>
    //     ),
    //     stock: (
    //       <SoftTypography variant="caption" color="text" fontWeight="medium">
    //         $3,000
    //       </SoftTypography>
    //     ),
    //     completion: (
    //       <SoftBox width="8rem" textAlign="left">
    //         <SoftProgress value={10} color="info" variant="gradient" label={false} />
    //       </SoftBox>
    //     ),
    //   },
      
    // ],
  };
}