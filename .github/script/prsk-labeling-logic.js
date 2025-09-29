import {
  prskCharacter,
  vocaloidCharacter,
  collaborationScenarios,
  replaceTemplate,
} from './prsk-yell-label.constant'

// Ramdom select prsk character
export const selectPrskCharacter = () => {
  const langth = Object.keys(prskCharacter).length
  const ramdomId = Math.floor(Math.random() * langth) + 1
  return prskCharacter[ramdomId]
}

// Ramdom select vocaloid character
export const selectVocaloidCharacter = () => {
  const length = Object.keys(vocaloidCharacter).length
  const ramdomId = Math.floor(Math.random() * length) + 1
  return vocaloidCharacter[ramdomId]
}

// Judge encounter
export const isEncounter = (probability = 0.25) => {
  return Math.random() < probability
}

// create label text
export const createLabelText = (character) => {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${month}/${day}: ${character.name}`
}

// Collaboration comment
export const createCollaborationComment = (mainChar, guestChar, prAuthor) => {
  const length = collaborationScenarios.length
  const scenario = collaborationScenarios[Math.floor(Math.random() * length)]

  const storyText = replaceTemplate(scenario.story, {
    main: mainChar.name,
    guest: guestChar.name,
  })

  const mainComment = replaceTemplate(mainChar.comment, { prAuthor: prAuthor })
  const guestComment = replaceTemplate(guestChar.comment, { prAuthor: prAuthor })

  return `## ${scenario.title}\n\n${storyText}\n\n---\n### 🎭 登場キャラクター\n- **${mainChar.name}**: ${mainComment}\n- **${guestChar.name}**: ${guestComment}\n\n> 素敵なコラボレーションです！✨`
}

// Single comment
export function createSingleComment(character, prAuthor) {
  const comment = replaceTemplate(character.comment, { prAuthor: prAuthor })
  return `🎵 **${character.name}** が登場！\n\n> ${comment}\n\n今日も素敵なコードをありがとうございます！`
}

// Create label or obtain existing label
export async function ensureLabel(github, context, labelName, description, color) {
  try {
    await github.rest.issues.getLabel({
      owner: context.repo.owner,
      repo: context.repo.repo,
      name: labelName,
    })
    console.log(`Label already exists: ${labelName}`)
  } catch (error) {
    if (error.status === 404) {
      await github.rest.issues.createLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        name: labelName,
        description: description,
        color: color,
      })
      console.log(`Created label: ${labelName}`)
    } else {
      throw error
    }
  }
}

// Add label to PR
export async function addLabels(github, context, labels) {
  await github.rest.issues.addLabels({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    labels: labels,
  })
  console.log(`Added labels: ${labels.join(', ')} to PR #${context.issue.number}`)
}

// Post comment to PR
export async function postComment(github, context, body) {
  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    body: body,
  })
  console.log(`Posted comment to PR #${context.issue.number}`)
}

/**
 * Main logic to handle PR labeling and commenting
 */
export const handlePrLabeling = async (github, context) => {
  const prAuthor = context.payload.pull_request.user.login

  // Select random prsk character
  const prskCharacter = selectPrskCharacter()
  const prskLabelName = createLabelText(prskCharacter)
  const prskLabelNameComment = replaceTemplate(prskCharacter.comment, {
    prAuthor: prAuthor,
  })

  let labelsToAdd = [prskLabelName]
  let commentBody = ''

  // Judge encounter event
  const hasEncounter = isEncounter()
  console.log(`Vocaloid encounter occurred: ${hasEncounter}`)

  if (hasEncounter) {
    // Select random vocaloid character
    const vocaloid = selectVocaloidCharacter()
    const vocaloidLabelName = createLabelText(vocaloid)
    const vocaloidComment = replaceTemplate(vocaloid.comment, { prAuthor: prAuthor })

    labelsToAdd.push(vocaloidLabelName)

    // Create collaboration comment
    commentBody = createCollaborationComment(prskCharacter, vocaloid, prAuthor)

    // Create vocaloid label
    await ensureLabel(github, context, vocaloidLabelName, vocaloidComment, vocaloid.color)
  } else {
    // Create single comment
    commentBody = createSingleComment(prskCharacter, prAuthor)
  }

  // Create prsk label
  await ensureLabel(github, context, prskLabelName, prskLabelNameComment, prskCharacter.color)

  // Add labels to PR
  await addLabels(github, context, labelsToAdd)

  // Post comment to PR
  await postComment(github, context, commentBody)
}
