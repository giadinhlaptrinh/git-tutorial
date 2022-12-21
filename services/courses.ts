import { Course } from "../types";
import { courseConfig } from '../course';

export function getCourseInfo(): Course {
    return {
        ...courseConfig
    }
}