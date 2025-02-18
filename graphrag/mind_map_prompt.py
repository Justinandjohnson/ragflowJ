#
#  Copyright 2024 The InfiniFlow Authors. All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
#
MIND_MAP_EXTRACTION_PROMPT = """
 - Role: You're a talent text processor.

 - Step of task:
   1. Generate a title for user's 'TEXT'。
   2. Classify the 'TEXT' into sections as you see fit.
   3. If the subject matter is really complex, split them into sub-sections. 

 - Output requirement:
   - Always try to maximize the number of sub-sections. 
   - In language of 
   - MUST IN FORMAT OF MARKDOWN
   
Output:
## <Title>
  <Section Name>
  <Section Name>
    <Subsection Name>
    <Subsection Name>
  <Section Name>
    <Subsection Name>
    
-TEXT-
{input_text}

Output:
"""