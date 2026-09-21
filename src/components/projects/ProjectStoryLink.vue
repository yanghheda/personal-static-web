<script setup>
import { computed } from 'vue'
import { projectStories } from '@/data/projectStories'

const props = defineProps({ slug: { type: String, required: true } })
const project = computed(() => projectStories[props.slug])
</script>

<template>
  <RouterLink
    :to="`/projects/${slug}`"
    class="project-story-link"
    :class="`project-story-link--${slug}`"
    :aria-label="`${project.name} 项目详情`"
  >
    <span class="project-story-icon" aria-hidden="true">{{ slug === 'forgeai' ? '⌘' : '✳' }}</span>
    <span class="project-story-label">
      <small>EXPLORE THE PROJECT / {{ project.index }}</small>
      <strong>{{ project.headline.join('') }}</strong>
      <span>滚动探索 · 产品流程 / 架构 / 工程取舍</span>
    </span>
    <span class="project-story-arrow" aria-hidden="true">↗</span>
  </RouterLink>
</template>

<style scoped>
.project-story-link {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 30px;
  padding: 28px;
  border-radius: 12px;
  background: #14141c;
  color: #f0edf6;
  overflow: hidden;
  transition: transform .3s, box-shadow .3s;
}

.project-story-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px #15120e14;
}

.project-story-link--hengpick {
  background: #dfe7cf;
  color: #31472f;
}

.project-story-icon {
  display: grid;
  place-items: center;
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  font-size: 44px;
  color: #c2a6ff;
  background: #c2a6ff0d;
  border: 1px solid #c2a6ff22;
  border-radius: 18px;
  transform: rotate(-8deg);
}

.project-story-link--hengpick .project-story-icon {
  background: #fff5;
  border-color: #55733d20;
  color: #61834b;
}

.project-story-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.project-story-label small {
  font: 8px var(--font-mono);
  letter-spacing: 1.5px;
  opacity: .6;
}

.project-story-label strong {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -.6px;
}

.project-story-label>span {
  font-size: 10px;
  opacity: .6;
}

.project-story-arrow {
  margin-left: auto;
  font-size: 30px;
  font-weight: 300;
  transition: transform .3s;
}

.project-story-link:hover .project-story-arrow {
  transform: translate(3px, -3px);
}

@media (max-width: 620px) {
  .project-story-link {
    padding: 20px 16px;
    gap: 14px;
  }

  .project-story-icon {
    width: 44px;
    height: 52px;
    border-radius: 10px;
    font-size: 30px;
  }

  .project-story-label strong {
    font-size: 14px;
  }

  .project-story-label small {
    font-size: 6px;
    letter-spacing: .8px;
  }

  .project-story-label>span {
    font-size: 8px;
  }

  .project-story-arrow {
    font-size: 22px;
  }
}
</style>
