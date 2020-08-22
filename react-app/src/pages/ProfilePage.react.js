// @flow

import React from "react";

import {
  Container,
  Grid,
  Card,
  Button,
  Form,
  Header,
  Alert,
} from "tabler-react";

import SiteWrapper from "../SiteWrapper.react";

import JobseekerExpContainer from "../components/JobseekerExpContainer.react";
import JobseekerEduContainer from "../components/JobseekerEduContainer.react";

function ProfilePage() {

  return (
    <SiteWrapper>
      <Alert type="warning" isDismissible>
        <center>
          All information on your profile is publically available to potential
          employers.
        </center>
      </Alert>
      <div className="my-3 my-md-5">
        <Container>
          <Grid.Row>
            <Grid.Col lg={12}>

              <Header.H1>Your Profile</Header.H1>

              {/* Jobseeker General Information Set */}
              <Form className="card" name="generalInfo">
                <Card.Body>
                  <Card.Title>General Information</Card.Title>
                  <Grid.Row>
                    <Grid.Col sm={6} md={6}>
                      <Form.Group label="First Name" isRequired>
                        <Form.Input name="firstname" />
                      </Form.Group>
                    </Grid.Col>
                    <Grid.Col sm={6} md={6}>
                      <Form.Group label="Surname" isRequired>
                        <Form.Input name="surname" />
                      </Form.Group>
                    </Grid.Col>
                    <Grid.Col sm={6} md={4}>
                      <Form.Group label="City">
                        <Form.Input name="city" />
                      </Form.Group>
                    </Grid.Col>
                    <Grid.Col sm={6} md={3}>
                      <Form.Group label="Post Code" isRequired>
                        <Form.MaskedInput
                          name="postcode"
                          mask={[/\d/, /\d/, /\d/, /\d/]}
                        />
                      </Form.Group>
                    </Grid.Col>
                    <Grid.Col md={5}>
                      <Form.Group label="Country" isRequired>
                        <Form.Select>
                          <option value="Afghanistan">Afghanistan</option>
                          <option value="Åland Islands">Åland Islands</option>
                          <option value="Albania">Albania</option>
                          <option value="Algeria">Algeria</option>
                          <option value="American Samoa">American Samoa</option>
                          <option value="Andorra">Andorra</option>
                          <option value="Angola">Angola</option>
                          <option value="Anguilla">Anguilla</option>
                          <option value="Antarctica">Antarctica</option>
                          <option value="Antigua and Barbuda">
                            Antigua and Barbuda
                          </option>
                          <option value="Argentina">Argentina</option>
                          <option value="Armenia">Armenia</option>
                          <option value="Aruba">Aruba</option>
                          <option value="Australia">Australia</option>
                          <option value="Austria">Austria</option>
                          <option value="Azerbaijan">Azerbaijan</option>
                          <option value="Bahamas">Bahamas</option>
                          <option value="Bahrain">Bahrain</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Barbados">Barbados</option>
                          <option value="Belarus">Belarus</option>
                          <option value="Belgium">Belgium</option>
                          <option value="Belize">Belize</option>
                          <option value="Benin">Benin</option>
                          <option value="Bermuda">Bermuda</option>
                          <option value="Bhutan">Bhutan</option>
                          <option value="Bolivia">Bolivia</option>
                          <option value="Bosnia and Herzegovina">
                            Bosnia and Herzegovina
                          </option>
                          <option value="Botswana">Botswana</option>
                          <option value="Bouvet Island">Bouvet Island</option>
                          <option value="Brazil">Brazil</option>
                          <option value="British Indian Ocean Territory">
                            British Indian Ocean Territory
                          </option>
                          <option value="Brunei Darussalam">
                            Brunei Darussalam
                          </option>
                          <option value="Bulgaria">Bulgaria</option>
                          <option value="Burkina Faso">Burkina Faso</option>
                          <option value="Burundi">Burundi</option>
                          <option value="Cambodia">Cambodia</option>
                          <option value="Cameroon">Cameroon</option>
                          <option value="Canada">Canada</option>
                          <option value="Cape Verde">Cape Verde</option>
                          <option value="Cayman Islands">Cayman Islands</option>
                          <option value="Central African Republic">
                            Central African Republic
                          </option>
                          <option value="Chad">Chad</option>
                          <option value="Chile">Chile</option>
                          <option value="China">China</option>
                          <option value="Christmas Island">
                            Christmas Island
                          </option>
                          <option value="Cocos (Keeling) Islands">
                            Cocos (Keeling) Islands
                          </option>
                          <option value="Colombia">Colombia</option>
                          <option value="Comoros">Comoros</option>
                          <option value="Congo">Congo</option>
                          <option value="Congo, The Democratic Republic of The">
                            Congo, The Democratic Republic of The
                          </option>
                          <option value="Cook Islands">Cook Islands</option>
                          <option value="Costa Rica">Costa Rica</option>
                          <option value="Cote D'ivoire">Cote D'ivoire</option>
                          <option value="Croatia">Croatia</option>
                          <option value="Cuba">Cuba</option>
                          <option value="Cyprus">Cyprus</option>
                          <option value="Czech Republic">Czech Republic</option>
                          <option value="Denmark">Denmark</option>
                          <option value="Djibouti">Djibouti</option>
                          <option value="Dominica">Dominica</option>
                          <option value="Dominican Republic">
                            Dominican Republic
                          </option>
                          <option value="Ecuador">Ecuador</option>
                          <option value="Egypt">Egypt</option>
                          <option value="El Salvador">El Salvador</option>
                          <option value="Equatorial Guinea">
                            Equatorial Guinea
                          </option>
                          <option value="Eritrea">Eritrea</option>
                          <option value="Estonia">Estonia</option>
                          <option value="Ethiopia">Ethiopia</option>
                          <option value="Falkland Islands (Malvinas)">
                            Falkland Islands (Malvinas)
                          </option>
                          <option value="Faroe Islands">Faroe Islands</option>
                          <option value="Fiji">Fiji</option>
                          <option value="Finland">Finland</option>
                          <option value="France">France</option>
                          <option value="French Guiana">French Guiana</option>
                          <option value="French Polynesia">
                            French Polynesia
                          </option>
                          <option value="French Southern Territories">
                            French Southern Territories
                          </option>
                          <option value="Gabon">Gabon</option>
                          <option value="Gambia">Gambia</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Germany">Germany</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Gibraltar">Gibraltar</option>
                          <option value="Greece">Greece</option>
                          <option value="Greenland">Greenland</option>
                          <option value="Grenada">Grenada</option>
                          <option value="Guadeloupe">Guadeloupe</option>
                          <option value="Guam">Guam</option>
                          <option value="Guatemala">Guatemala</option>
                          <option value="Guernsey">Guernsey</option>
                          <option value="Guinea">Guinea</option>
                          <option value="Guinea-bissau">Guinea-bissau</option>
                          <option value="Guyana">Guyana</option>
                          <option value="Haiti">Haiti</option>
                          <option value="Heard Island and Mcdonald Islands">
                            Heard Island and Mcdonald Islands
                          </option>
                          <option value="Holy See (Vatican City State)">
                            Holy See (Vatican City State)
                          </option>
                          <option value="Honduras">Honduras</option>
                          <option value="Hong Kong">Hong Kong</option>
                          <option value="Hungary">Hungary</option>
                          <option value="Iceland">Iceland</option>
                          <option value="India">India</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="Iran, Islamic Republic of">
                            Iran, Islamic Republic of
                          </option>
                          <option value="Iraq">Iraq</option>
                          <option value="Ireland">Ireland</option>
                          <option value="Isle of Man">Isle of Man</option>
                          <option value="Israel">Israel</option>
                          <option value="Italy">Italy</option>
                          <option value="Jamaica">Jamaica</option>
                          <option value="Japan">Japan</option>
                          <option value="Jersey">Jersey</option>
                          <option value="Jordan">Jordan</option>
                          <option value="Kazakhstan">Kazakhstan</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Kiribati">Kiribati</option>
                          <option value="Korea, Democratic People's Republic of">
                            Korea, Democratic People's Republic of
                          </option>
                          <option value="Korea, Republic of">
                            Korea, Republic of
                          </option>
                          <option value="Kuwait">Kuwait</option>
                          <option value="Kyrgyzstan">Kyrgyzstan</option>
                          <option value="Lao People's Democratic Republic">
                            Lao People's Democratic Republic
                          </option>
                          <option value="Latvia">Latvia</option>
                          <option value="Lebanon">Lebanon</option>
                          <option value="Lesotho">Lesotho</option>
                          <option value="Liberia">Liberia</option>
                          <option value="Libyan Arab Jamahiriya">
                            Libyan Arab Jamahiriya
                          </option>
                          <option value="Liechtenstein">Liechtenstein</option>
                          <option value="Lithuania">Lithuania</option>
                          <option value="Luxembourg">Luxembourg</option>
                          <option value="Macao">Macao</option>
                          <option value="Macedonia, The Former Yugoslav Republic of">
                            Macedonia, The Former Yugoslav Republic of
                          </option>
                          <option value="Madagascar">Madagascar</option>
                          <option value="Malawi">Malawi</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Maldives">Maldives</option>
                          <option value="Mali">Mali</option>
                          <option value="Malta">Malta</option>
                          <option value="Marshall Islands">
                            Marshall Islands
                          </option>
                          <option value="Martinique">Martinique</option>
                          <option value="Mauritania">Mauritania</option>
                          <option value="Mauritius">Mauritius</option>
                          <option value="Mayotte">Mayotte</option>
                          <option value="Mexico">Mexico</option>
                          <option value="Micronesia, Federated States of">
                            Micronesia, Federated States of
                          </option>
                          <option value="Moldova, Republic of">
                            Moldova, Republic of
                          </option>
                          <option value="Monaco">Monaco</option>
                          <option value="Mongolia">Mongolia</option>
                          <option value="Montenegro">Montenegro</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Morocco">Morocco</option>
                          <option value="Mozambique">Mozambique</option>
                          <option value="Myanmar">Myanmar</option>
                          <option value="Namibia">Namibia</option>
                          <option value="Nauru">Nauru</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="Netherlands Antilles">
                            Netherlands Antilles
                          </option>
                          <option value="New Caledonia">New Caledonia</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Nicaragua">Nicaragua</option>
                          <option value="Niger">Niger</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Niue">Niue</option>
                          <option value="Norfolk Island">Norfolk Island</option>
                          <option value="Northern Mariana Islands">
                            Northern Mariana Islands
                          </option>
                          <option value="Norway">Norway</option>
                          <option value="Oman">Oman</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Palau">Palau</option>
                          <option value="Palestinian Territory, Occupied">
                            Palestinian Territory, Occupied
                          </option>
                          <option value="Panama">Panama</option>
                          <option value="Papua New Guinea">
                            Papua New Guinea
                          </option>
                          <option value="Paraguay">Paraguay</option>
                          <option value="Peru">Peru</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Pitcairn">Pitcairn</option>
                          <option value="Poland">Poland</option>
                          <option value="Portugal">Portugal</option>
                          <option value="Puerto Rico">Puerto Rico</option>
                          <option value="Qatar">Qatar</option>
                          <option value="Reunion">Reunion</option>
                          <option value="Romania">Romania</option>
                          <option value="Russian Federation">
                            Russian Federation
                          </option>
                          <option value="Rwanda">Rwanda</option>
                          <option value="Saint Helena">Saint Helena</option>
                          <option value="Saint Kitts and Nevis">
                            Saint Kitts and Nevis
                          </option>
                          <option value="Saint Lucia">Saint Lucia</option>
                          <option value="Saint Pierre and Miquelon">
                            Saint Pierre and Miquelon
                          </option>
                          <option value="Saint Vincent and The Grenadines">
                            Saint Vincent and The Grenadines
                          </option>
                          <option value="Samoa">Samoa</option>
                          <option value="San Marino">San Marino</option>
                          <option value="Sao Tome and Principe">
                            Sao Tome and Principe
                          </option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Senegal">Senegal</option>
                          <option value="Serbia">Serbia</option>
                          <option value="Seychelles">Seychelles</option>
                          <option value="Sierra Leone">Sierra Leone</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Slovakia">Slovakia</option>
                          <option value="Slovenia">Slovenia</option>
                          <option value="Solomon Islands">
                            Solomon Islands
                          </option>
                          <option value="Somalia">Somalia</option>
                          <option value="South Africa">South Africa</option>
                          <option value="South Georgia and The South Sandwich Islands">
                            South Georgia and The South Sandwich Islands
                          </option>
                          <option value="Spain">Spain</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                          <option value="Sudan">Sudan</option>
                          <option value="Suriname">Suriname</option>
                          <option value="Svalbard and Jan Mayen">
                            Svalbard and Jan Mayen
                          </option>
                          <option value="Swaziland">Swaziland</option>
                          <option value="Sweden">Sweden</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Syrian Arab Republic">
                            Syrian Arab Republic
                          </option>
                          <option value="Taiwan, Province of China">
                            Taiwan, Province of China
                          </option>
                          <option value="Tajikistan">Tajikistan</option>
                          <option value="Tanzania, United Republic of">
                            Tanzania, United Republic of
                          </option>
                          <option value="Thailand">Thailand</option>
                          <option value="Timor-leste">Timor-leste</option>
                          <option value="Togo">Togo</option>
                          <option value="Tokelau">Tokelau</option>
                          <option value="Tonga">Tonga</option>
                          <option value="Trinidad and Tobago">
                            Trinidad and Tobago
                          </option>
                          <option value="Tunisia">Tunisia</option>
                          <option value="Turkey">Turkey</option>
                          <option value="Turkmenistan">Turkmenistan</option>
                          <option value="Turks and Caicos Islands">
                            Turks and Caicos Islands
                          </option>
                          <option value="Tuvalu">Tuvalu</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Ukraine">Ukraine</option>
                          <option value="United Arab Emirates">
                            United Arab Emirates
                          </option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="United States Minor Outlying Islands">
                            United States Minor Outlying Islands
                          </option>
                          <option value="Uruguay">Uruguay</option>
                          <option value="Uzbekistan">Uzbekistan</option>
                          <option value="Vanuatu">Vanuatu</option>
                          <option value="Venezuela">Venezuela</option>
                          <option value="Viet Nam">Viet Nam</option>
                          <option value="Virgin Islands, British">
                            Virgin Islands, British
                          </option>
                          <option value="Virgin Islands, U.S.">
                            Virgin Islands, U.S.
                          </option>
                          <option value="Wallis and Futuna">
                            Wallis and Futuna
                          </option>
                          <option value="Western Sahara">Western Sahara</option>
                          <option value="Yemen">Yemen</option>
                          <option value="Zambia">Zambia</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                        </Form.Select>
                      </Form.Group>
                    </Grid.Col>
                    <Grid.Col md={12}>
                      <Form.Group className="mb=0" label="About Me">
                        <Form.Textarea
                          name="aboutme"
                          rows={3}
                          placeholder="Enter a short description about yourself..."
                        />
                      </Form.Group>
                    </Grid.Col>
                  </Grid.Row>
                </Card.Body>
              </Form>

              {/* Jobseeker Skills Set */}
              <Form className="card" name="skills">
                <Card.Body>
                  <Card.Title>Top skills</Card.Title>
                  <Grid.Row>
                    <Grid.Col offset={1}>
                      <Form.Group name="softskills" label="Soft Skills">
                        <Form.SelectGroup canSelectMultiple pills>
                          <Form.SelectGroupItem
                            label="Communication"
                            name="communication"
                            value="Communication"
                          />
                          <Form.SelectGroupItem
                            label="Teamwork"
                            name="teamwork"
                            value="Teamwork"
                          />
                          <Form.SelectGroupItem
                            label="Creativity"
                            name="creativity"
                            value="Creativity"
                          />
                          <Form.SelectGroupItem
                            label="Responsible"
                            name="responsible"
                            value="Responsible"
                          />
                          <Form.SelectGroupItem
                            label="Time Management"
                            name="timemanagement"
                            value="Time Management"
                          />
                          <Form.SelectGroupItem
                            label="Critical Thinking"
                            name="criticalthinking"
                            value="Critical Thinking"
                          />
                          <Form.SelectGroupItem
                            label="Organisation"
                            name="organisation"
                            value="Organisation"
                          />
                          <Form.SelectGroupItem
                            label="Emotional Intelligence"
                            name="emotionalintelligence"
                            value="Emotional Intelligence"
                          />
                          <Form.SelectGroupItem
                            label="Attention to Detail"
                            name="attdetail"
                            value="Attention to Detail"
                          />
                          <Form.SelectGroupItem
                            label="Flexibility"
                            name="flexibility"
                            value="Flexibility"
                          />
                          <Form.SelectGroupItem
                            label="Customer Service"
                            name="customerservice"
                            value="Customer Service"
                          />
                        </Form.SelectGroup>
                      </Form.Group>
                    </Grid.Col>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Col offset={1}>
                      <Form.Group name="hardskills" label="Hard Skills">
                        <Form.SelectGroup canSelectMultiple pills>
                          <Form.SelectGroupItem
                            label="Design"
                            name="design"
                            value="Design"
                          />
                          <Form.SelectGroupItem
                            label="Data Analysis"
                            name="dataanalysis"
                            value="Data Analysis"
                          />
                          <Form.SelectGroupItem
                            label="Mathmetics"
                            name="mathmetics"
                            value="Mathmetics"
                          />
                          <Form.SelectGroupItem
                            label="Copy Writing"
                            name="copywriting"
                            value="Copy Writing"
                          />
                          <Form.SelectGroupItem
                            label="Marketing"
                            name="marketing"
                            value="Marketing"
                          />
                          <Form.SelectGroupItem
                            label="Negotiation"
                            name="negotiation"
                            value="Negotiation"
                          />
                          <Form.SelectGroupItem
                            label="Project Management"
                            name="projectmanagement"
                            value="Project Management"
                          />
                          <Form.SelectGroupItem
                            label="Administration"
                            name="administration"
                            value="Administration"
                          />
                          <Form.SelectGroupItem
                            label="Foreign Languages"
                            name="language"
                            value="Foreign Languages"
                          />
                        </Form.SelectGroup>
                      </Form.Group>
                    </Grid.Col>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Col offset={1}>
                      <Form.Group
                        name="techskills"
                        label="Technological Skills"
                      >
                        <Form.SelectGroup canSelectMultiple pills>
                          <Form.SelectGroupItem
                            label="Adobe Photoshop"
                            name="adobephotoshop"
                            value="Adobe Photoshop"
                          />
                          <Form.SelectGroupItem
                            label="Adobe XD"
                            name="adobexd"
                            value="Adobe XD"
                          />
                          <Form.SelectGroupItem
                            label="Adobe Premier"
                            name="adobepremier"
                            value="Adobe Premier"
                          />
                          <Form.SelectGroupItem
                            label="Excel"
                            name="excel"
                            value="Excel"
                          />
                          <Form.SelectGroupItem
                            label="Microsoft Office"
                            name="microsoftoffice"
                            value="Microsoft Office"
                          />
                          <Form.SelectGroupItem
                            label="Web Development"
                            name="webdevelopment"
                            value="Web Development"
                          />
                          <Form.SelectGroupItem
                            label="Front-End"
                            name="frontend"
                            value="Front-End"
                          />
                          <Form.SelectGroupItem
                            label="Back-End"
                            name="backend"
                            value="Back-End"
                          />
                          <Form.SelectGroupItem
                            label="Javascript"
                            name="javascript"
                            value="Javascript"
                          />
                          <Form.SelectGroupItem
                            label="PHP"
                            name="php"
                            value="PHP"
                          />
                          <Form.SelectGroupItem
                            label="C++"
                            name="c++"
                            value="C++"
                          />
                          <Form.SelectGroupItem
                            label="Java"
                            name="java"
                            value="Java"
                          />
                          <Form.SelectGroupItem
                            label="Cloud Computing"
                            name="cloudcomputing"
                            value="Cloud Computing"
                          />
                        </Form.SelectGroup>
                      </Form.Group>
                    </Grid.Col>
                  </Grid.Row>
                </Card.Body>
              </Form>

              {/* Jobseeker Experience Set */}
              <JobseekerExpContainer/>

              {/* Jobseeker Education Set */}
              <JobseekerEduContainer/>

            </Grid.Col>
          </Grid.Row>
        </Container>
      </div>
    </SiteWrapper>
  );
}

export default ProfilePage;
